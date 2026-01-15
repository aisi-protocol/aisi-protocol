const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const REGISTRY_URL = process.env.REGISTRY_URL || 'http://localhost:8080';

// 模拟网关：根据服务ID路由请求
app.all('/aisi/*', async (req, res) => {
  const serviceId = req.headers['aisi-service-id'] || 'urn:aisi:service:demo:weather';

  try {
    // 从注册中心获取服务定义
    const manifestRes = await axios.get(`${REGISTRY_URL}/.well-known/aisi.json`);
    const services = manifestRes.data.services;

    if (services.includes(serviceId)) {
      // 这里应该是实际的路由逻辑，此处模拟返回
      res.json({
        message: `Request routed to service: ${serviceId}`,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(404).json({ error: 'Service not found on this platform' });
    }
  } catch (err) {
    res.status(503).json({ error: 'Service registry unavailable' });
  }
});

app.listen(3000, () => {
  console.log('AISI Demo API Gateway running on port 3000');
  console.log(`Registry URL: ${REGISTRY_URL}`);
});