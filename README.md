# 从需求到原型

一个 Agent skill。你给一句话需求，它问清会改变产品的几条规则，然后交给你一份精简 PRD、每个功能一张流程图、一个可交互原型，外加一份只给你自己看的确认单。

当前版本：v0.1.0。

适合有需求要交给别人实现的人：产品经理、兼做需求的产品运营和业务人员、创业者、需描述需求给外包的甲方、独立开发者。需求要有界面和规则；纯接口、纯数据任务和营销方案不适用。

## 产出什么

| 文件 | 给谁看 | 是什么样 |
| --- | --- | --- |
| `<需求名>-PRD.md` | 评审人、研发、外包方 | 需求概述、范围、功能需求、验收要点四个固定章节，状态流转、异常处理、角色和权限等章节按需出现。业务规则编号为 `R1`、`R2`，验收要点对回规则编号。你给了以前写的 PRD 时，改用你的章节结构、编号方式和用语 |
| `assets/<需求名>-<功能名>-流程图.svg` | 同上 | 纵向泳道图，每个功能一张，PRD 里直接引用 |
| `<需求名>-原型.html` | 同上 | 单个 HTML 文件，断网也能打开。有导航、面包屑、图标和贴合业务的示例数据，看起来像一个真实的系统。规则写在界面上，对应的元素旁有小灯泡，悬停显示规则编号和内容；右上角的"规则标注"开关关掉灯泡后，可以直接拿去演示 |
| `<需求名>-确认单-交付前必看.html` | 只给你 | 用浏览器打开，左侧是目录，右侧一条一张卡片，列出哪些规则和数值是 skill 自己补的、哪些问题没确认、哪些和你以前的文档冲突，每条写明不对的话要改哪里 |

确认单的内容不会出现在 PRD 和原型里。把 PRD 和原型交出去之前，先看完确认单。

## 安装

把 `skills/one-line-prototype/` 整个目录放进你所用 Agent 的 skill 目录。目录里的 `references/` 和 `assets/` 都要保留，skill 运行时会读它们。

## 使用

对 Agent 说出你的需求，例如：

```
给门店加一个退货申请功能，店员提交，区域经理审核。
```

skill 先告诉你分级结果，再一次问完问题，每题的第一个选项是推荐答案。运行环境支持时，问题会以点选的方式弹出；不支持时是下面这样的文字：

```
这个需求判定为简化：只涉及一个二级菜单、一个带状态的对象（退货申请）和两个角色，没有命中任何复杂条件。

开始写之前有 3 个问题。每个问题我标了推荐的选项，你可以直接回"都按推荐"。

1. 退货有没有期限？
   - A. 购买后 30 天内可以退（推荐：一个月足够顾客发现问题回店，门店也不会收到放了很久的商品）
   - B. 购买后 7 天内可以退
   - C. 没有期限
...
```

你回"都按推荐"，它交付四个文件：

```
已生成四样文件，都在 退货申请/ 目录下：

- 退货申请-PRD.md
- assets/退货申请-提交与审核-流程图.svg
- 退货申请-原型.html（直接用浏览器打开）
- 退货申请-确认单-交付前必看.html（只给你看，不要随 PRD 发出）

确认单里有 4 条要你确认，影响最大的是第 1 条：我补了一条"超过 5000 元要财务再审一次"的规则。

要改哪里，直接说一句，我会同时改 PRD、原型和确认单。
```

之后用一句话改，例如"R3 改成 3000 元"或"去掉财务审核"，PRD、原型和确认单会一起更新。

例子里的数值都是示例值。

想让 PRD 像你们团队写的，把以前的 PRD 或方案文档一起给它；想让原型像你们的系统，给它页面截图或设计规范。不给也能用，交付时确认单里会写明用了默认结构和默认样式。

## 和完整流程的关系

这个 skill 是 [PM Agentic Cookbook](https://github.com/Sunnyshinnny776/pm-agentic-cookbook) 的轻量版本，用于子功能和迭代这类规模的需求。

需求涉及新建系统或完整模块、两个及以上二级菜单、两个及以上带状态流转的对象、对接外部系统、三个及以上流程不同的角色时，skill 会判定为复杂，建议改走 cookbook 的完整流程。完整流程会先建领域模型，有独立的检查环节和验收台账，会核对跨模块的一致性，这几样本 skill 都不做。cookbook 没装时，skill 会给出链接和安装方式，装不装由你决定；不装也会照常产出，并在确认单里写明少做了哪几样。

## 许可证与来源

本仓库按 [Apache License 2.0](LICENSE) 授权，版权和归属声明见 [NOTICE](NOTICE)。

本仓库派生自 PM Agentic Cookbook，其中 PRD 的结构和写作规则来自 cookbook 的 create-prd，后者派生自 [pmYangKun/create-prd-skill](https://github.com/pmYangKun/create-prd-skill)。改写过的文件在文件头注明了来源和"已修改"。原型的补充交互规则参考了 Ant Design 的设计规范，没有使用它的代码。

## English

One-line-prototype (从需求到原型) is an Agent skill for people who hand requirements to others to build: product managers, operations and business staff, founders, and clients briefing outsourced teams. Give it a one-line requirement; it asks up to five questions about the rules that change the product, then delivers a concise PRD, one flow diagram per feature, a clickable single-file prototype that works offline, and a confirmation sheet for you alone that lists everything it filled in on its own. Large requirements are routed to the full PM Agentic Cookbook process.

To install, copy `skills/one-line-prototype/` into your agent's skill directory, keeping `references/` and `assets/`. The skill's instructions and everything it produces are in Chinese. There is no English version yet.
