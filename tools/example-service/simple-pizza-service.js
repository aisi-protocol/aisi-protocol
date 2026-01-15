// 一个极简的披萨服务模拟后端
const express = require('express');
const app = express();
app.use(express.json());

// 内存中存储订单
const orders = new Map();

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'running', 
    service: 'AISI Demo Pizza Service',
    version: '1.0.0'
  });
});

// 模拟接收AISI服务调用
app.post('/demo/orders', (req, res) => {
  const { customer_name, pizza_type, quantity, address } = req.body;
  
  // 简单验证
  if (!pizza_type || !quantity) {
    return res.status(400).json({ 
      error: 'Missing required fields: pizza_type and quantity are required' 
    });
  }
  
  // 创建订单
  const orderId = `pizza_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const order = {
    order_id: orderId,
    customer_name: customer_name || 'Anonymous Customer',
    pizza_type,
    quantity,
    address: address || 'Not specified',
    status: 'preparing',
    order_time: new Date().toISOString(),
    estimated_ready: new Date(Date.now() + 25 * 60000).toISOString(), // 25分钟
    total_price: quantity * 89.00 // 假设单价89元
  };
  
  orders.set(orderId, order);
  
  console.log(`📦 New pizza order created: ${orderId}`);
  
  res.status(201).json({
    message: 'Pizza order received successfully!',
    order: order,
    next_steps: [
      'Your pizza is being prepared',
      'You can check status at GET /demo/orders/' + orderId
    ]
  });
});

// 查询订单状态
app.get('/demo/orders/:orderId', (req, res) => {
  const order = orders.get(req.params.orderId);
  
  if (!order) {
    return res.status(404).json({ 
      error: 'Order not found',
      suggestion: 'Check your order ID or create a new order'
    });
  }
  
  // 模拟状态变化
  const statuses = ['preparing', 'baking', 'quality_check', 'ready_for_delivery'];
  const elapsed = Date.now() - new Date(order.order_time).getTime();
  const statusIndex = Math.min(Math.floor(elapsed / 10000), statuses.length - 1);
  order.status = statuses[statusIndex];
  
  res.json(order);
});

// 获取所有订单（仅用于演示）
app.get('/demo/orders', (req, res) => {
  res.json({
    total_orders: orders.size,
    orders: Array.from(orders.values())
  });
});

// 启动服务器
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🍕 AISI Demo Pizza Service running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
  console.log(`   Create order: POST http://localhost:${PORT}/demo/orders`);
  console.log(`   Sample request body:`);
  console.log(`   { "pizza_type": "pepperoni", "quantity": 2, "customer_name": "John" }`);
});