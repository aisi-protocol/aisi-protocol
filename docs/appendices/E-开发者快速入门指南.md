# 附录E：开发者快速入门指南

## E.1 5分钟快速开始

### 目标：5分钟内完成首次API调用

#### 步骤1：获取访问凭证
1.  访问 [AISI开发者门户](https://developer.aisi.run)（如暂未上线，请关注Git仓库公告）。
2.  注册账号并创建一个新的API密钥，妥善保存。

#### 步骤2：安装SDK
根据您的开发语言选择安装命令：
```bash
# Python
pip install aisi-sdk
# Node.js
npm install aisi-sdk
# Go
go get github.com/aisi/sdk
步骤3：编写“Hello AISI”代码

使用您的API密钥初始化客户端，并尝试调用一个简单的服务。

python
# Python 示例
from aisi import Client

# 1. 初始化客户端
client = Client(api_key="YOUR_API_KEY_HERE")

# 2. 发现一个排序服务
services = client.discover_services(category="algorithm", min_efficiency=1000)
if services:
    sorting_service = services[0]  # 取效率最高的一个
    print(f"找到服务: {sorting_service.name}")

    # 3. 调用服务
    result = sorting_service.execute(input_data={"arr": [5, 2, 8, 1, 9, 3]})
    print(f"排序结果: {result.get('sorted_arr')}")
    print(f"执行耗时: {result.get('execution_time_ms')}ms")
    print(f"服务效率倍数: {result.get('efficiency_multiplier')}×")
else:
    print("未找到符合条件的服务。")
E.2 创建您的第一个原子化服务

目标：30分钟内创建、验证并注册一个简单服务

步骤1：定义服务

创建一个Python文件 my_first_service.py，并使用AISI装饰器声明服务。

python
from aisi import create_service

@create_service(
    name="fibonacci-calculator",
    level="algorithm",
    category="math",
    description="计算第n个斐波那契数"
)
def fibonacci(n: int) -> int:
    """
    计算斐波那契数列的第n项。
    参数:
        n (int): 斐波那契数列的位置（从0开始）。
    返回:
        第n个斐波那契数。
    """
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
步骤2：本地测试与效率验证

在项目目录下运行：

bash
# 运行内置测试（检查功能）
aisi test --local

# 进行本地效率预验证（得到预估倍数）
aisi verify --local --service fibonacci-calculator
步骤3：注册到AISI生态

当您对服务的功能和效率满意后，将其注册到公共生态中。

bash
# 注册服务（需要API密钥）
aisi register --service fibonacci-calculator --visibility public
注册成功后，您将获得一个唯一的服务ID和访问端点，其他开发者便可发现和调用您的服务。

E.3 探索进阶路径

完成基础入门后，您可以根据目标选择方向深入：

您的目标	推荐下一步	关键文档链接
使用更多服务	浏览服务市场，尝试调用不同类别（算法、组件、模块）的服务。	服务发现API
优化服务效率	学习效率验证的详细指标，使用性能分析工具定位瓶颈并优化。	第三章：效率验证协议
参与智能体协作	了解协同工作流协议，尝试构建一个使用多智能体服务的应用。	第四章：协同工作流协议
深入协议治理	阅读治理框架，了解如何通过提案影响协议未来方向。	第七章：治理与进化
E.4 获取帮助

文档：本协议所有章节和附录是您最好的参考。
社区：加入 Discord 或 GitHub Discussions 与其他开发者交流。
问题反馈：遇到SDK或工具问题，请在GitHub仓库提交Issue。
欢迎来到AISI生态，从一次简单的API调用开始，探索智能体协作的无限可能。

返回：附录目录
