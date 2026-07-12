# Hero 背景动效优化设计

> 项目：Avery Zhao Portfolio  
> 适用分支：`codex/rebuild-avery-portfolio`  
> 文档状态：设计方案，待实现  
> 主要涉及：`src/components/Hero.tsx`、`src/index.css`，可选新增 `src/components/CodeRain.tsx`

## 1. 设计目标

在不削弱首屏简历信息可读性的前提下，为 Hero 增加一层“持续运行中的 AI 系统”感。

动效不应只是通用的赛博朋克装饰，而应服务于个人网站的核心表达：

- 网格代表结构与秩序；
- 轨道代表模型、产品与系统的协同运行；
- 光标聚光代表人的参与和探索；
- 缓慢漂移的光场代表智能的演化与不确定性；
- 稀疏字符流代表信息、模型信号与后台计算过程。

最终体验目标：

1. 第一眼先看到标题、定位与行动按钮；
2. 停留数秒后，才发现背景在缓慢运行；
3. 动效增强科技感，但不把页面变成“黑客模板”；
4. 桌面端有细腻互动，移动端自动降级；
5. 尊重 `prefers-reduced-motion`。

## 2. 非目标

本轮不做以下效果：

- 满屏、高密度的《黑客帝国》式代码瀑布；
- 大量粒子连线、星空、爆炸光效；
- Three.js / WebGL 3D 场景；
- 快速扫描、闪烁或强烈霓虹；
- 覆盖 Experience 等高密度阅读区的持续动效；
- 依赖动效才能理解的核心信息。

## 3. 当前视觉基础

Hero 已具备以下元素：

- 深色背景与径向渐变；
- 64px 网格；
- 右上角轨道圆、双椭圆轨迹和信号点；
- 大字号主标题；
- 简介、按钮、元信息和 Signal Grid；
- lime、blue、coral 三类强调色。

优化应基于现有语言继续生长，而不是引入一套新的赛博朋克视觉系统。

## 4. 总体方案

采用两层互补动效：

### 4.1 AI 信号场

负责整体氛围与空间深度，包括：

- 网格缓慢漂移；
- lime / blue 两团低透明度光晕缓慢游动；
- 鼠标附近出现柔和聚光；
- 轨道极慢旋转；
- coral 信号点周期性呼吸；
- 极淡的斜向扫描纹理。

### 4.2 AI 信号雨

负责细节记忆点，包括：

- 右上轨道内部的主要字符流；
- 页面左右边缘少量短字符列；
- 字符自动避让标题、简介、按钮与数据区域；
- 鼠标接近时轻微增强亮度；
- 移动端只保留轨道内少量字符。

两层动效的优先级：

```text
内容文字与按钮             z-index: 2
轨道、标签、信号点          z-index: 1
信号雨 Canvas              z-index: 0
环境光、聚光、网格          z-index: 0 / pseudo element
Hero 背景                  base
```

## 5. AI 信号场细则

### 5.1 网格漂移

现有网格继续保留，增加低速背景位移。

建议参数：

| 参数 | 建议值 |
| --- | --- |
| 网格尺寸 | `64px × 64px` |
| 单次位移 | `64px 64px` |
| 周期 | `24–32s` |
| 动画类型 | `linear infinite` |
| 透明度 | 保持当前约 `0.035` |

设计原则：用户不能在第一秒明显感到网格移动，避免产生页面漂浮或眩晕感。

### 5.2 环境光团

在 Hero 底层增加两个模糊光团：

#### Lime 光团

- 位置：右上区域，靠近轨道；
- 尺寸：`min(52vw, 720px)`；
- 透明度：`0.12–0.16`；
- 模糊：`80–100px`；
- 周期：`14–18s`；
- 动作：小范围平移 + `0.94–1.08` 缩放。

#### Blue 光团

- 位置：左下或左侧中下部；
- 尺寸：`min(38vw, 540px)`；
- 透明度：`0.07–0.10`；
- 模糊：`80–100px`；
- 周期：`17–22s`；
- 与 Lime 光团反向运动，形成轻微空间对流。

光团不得形成明确边缘，不能覆盖成大面积高饱和色块。

### 5.3 鼠标聚光

桌面端根据指针位置更新 CSS 变量：

```css
--pointer-x
--pointer-y
--parallax-x
--parallax-y
```

聚光采用径向渐变：

- 半径：约 `380–460px`；
- 中心透明度：不高于 `0.12`；
- 36% 位置降低到约 `0.035`；
- 70% 后完全透明；
- 仅在 Hero 范围内生效；
- 使用 `requestAnimationFrame` 合并更新。

移动端、触摸设备和减少动态模式下关闭。

### 5.4 轨道旋转

现有两条椭圆轨道分别低速旋转：

| 轨道 | 周期 | 方向 |
| --- | --- | --- |
| orbit-one | `20–26s` | 顺时针 |
| orbit-two | `15–20s` | 逆时针 |

保持原有 `scaleY`，只改变旋转角度。轨道主体的整体透明度建议由当前较明显状态压低到 `0.45–0.55`，让字符流成为更细腻的动态主体。

### 5.5 信号点呼吸

coral 圆点保留，做低频呼吸：

- 周期：`2.6–3.2s`；
- 缩放：`0.82–1.12`；
- 阴影半径：`18–36px`；
- opacity：`0.65–1`。

不做位置移动，避免与轨道旋转产生过多视觉噪声。

### 5.6 扫描纹理

可用极淡的 `repeating-linear-gradient` 形成斜向信号纹理：

- 角度：约 `110–118deg`；
- 间隔：`100–130px`；
- 线条透明度：`0.012–0.02`；
- 周期：`20–28s`；
- 只覆盖 Hero 上部至中部；
- 移动端降低到 50% opacity 或直接关闭。

扫描纹理属于可选增强项。若与信号雨同时出现后页面偏满，应优先移除扫描纹理。

## 6. AI 信号雨细则

## 6.1 视觉定位

不复刻高密度绿色代码雨，而是设计成稀疏、克制的“AI 信号流”。

推荐字符集合：

```text
0 1 < > { } [ ] : : / \
AI PM MODEL AGENT SEARCH VISION SYSTEM BUILD
```

单词出现频率应明显低于单字符，作为偶发的信息节点，而不是持续滚动的标签墙。

## 6.2 分布区域

### 主要区域：右上轨道内部

- 承担约 60% 的字符量；
- 轨道圆作为天然裁切区；
- 4–8 个短列同时存在；
- 每列 4–10 个字符；
- 从轨道上方或圆内随机位置向下移动；
- 超出圆形遮罩后淡出并重置。

### 次要区域：页面边缘

- 左侧边缘 2–3 列；
- 右侧边缘 2–4 列；
- 每列长度 3–8 个字符；
- 不贯穿整个页面；
- 与内容区至少保留 `32–48px` 安全距离。

### 禁止区域

以下内容及其周围不得绘制字符：

- `.hero-copy`；
- `.hero h1`；
- `.hero-bottom`；
- `.hero-actions`；
- `.hero-meta`；
- `.signal-grid`；
- 导航栏可见区域。

禁区应在实际边界外增加 `24–40px` padding，避免字符贴着文字边缘出现。

## 6.3 颜色与透明度

沿用网站主色，不使用传统 Matrix 纯绿色。

| 层级 | 建议颜色 |
| --- | --- |
| 普通字符 | `rgba(216,255,83,0.05–0.12)` |
| 中间字符 | `rgba(216,255,83,0.12–0.18)` |
| 列头字符 | `rgba(216,255,83,0.20–0.30)` |
| 偶发蓝色字符 | `rgba(108,201,255,0.08–0.16)` |

列头可以有轻微 glow，但阴影半径不超过 `8–12px`。

整体原则：字符雨的平均亮度应低于轨道标签和 eyebrow，绝不能比标题更醒目。

## 6.4 尺寸、速度与密度

桌面端建议：

| 参数 | 建议值 |
| --- | --- |
| 总列数 | `8–14` |
| 轨道内列数 | `4–8` |
| 边缘列数 | `4–6` |
| 字号 | `10–13px` |
| 行距 | `14–18px` |
| 单次下落周期 | `6–14s` 随机 |
| 帧率上限 | `24–30 FPS` |
| 同时高亮列头 | 不超过 4 个 |

移动端建议：

| 参数 | 建议值 |
| --- | --- |
| 总列数 | `3–5` |
| 主要范围 | 仅轨道区域 |
| 字号 | `9–11px` |
| glow | 关闭或减半 |
| 鼠标响应 | 关闭 |

## 6.5 动画行为

每一列具有独立状态：

```ts
type SignalColumn = {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  length: number;
  chars: string[];
  region: 'orbit' | 'left-edge' | 'right-edge';
};
```

行为规则：

1. 每列以不同速度下降；
2. 字符序列偶尔随机替换一个字符；
3. 列头最亮，后续字符逐级衰减；
4. 到达边界后不立即跳回，而是先淡出再重置；
5. 同一时刻不允许所有列同步重置；
6. 页面不可见时暂停动画；
7. 语言切换、窗口变化后重新计算禁区。

## 6.6 鼠标响应

指针靠近字符列时，可进行轻微反馈：

- 距离小于 `180–240px` 时提升局部 opacity；
- 最大提升不超过原值的 1.4 倍；
- 可产生 `2–6px` 的水平偏移；
- 不做字符爆炸、排斥或剧烈速度变化。

该功能属于第二阶段增强。首版优先完成稳定绘制与文字避让。

## 7. 技术实现建议

## 7.1 推荐方案：Canvas

新增组件：

```text
src/components/CodeRain.tsx
```

Hero 结构示意：

```tsx
<section ref={heroRef} className="hero" id="top">
  <div className="hero-ambient" aria-hidden="true" />

  <CodeRain
    containerRef={heroRef}
    avoidSelectors={[
      '.hero-copy',
      '.hero-bottom',
      '.hero-meta',
      '.signal-grid',
    ]}
  />

  <div className="hero-orbit" aria-hidden="true">...</div>
  <div className="hero-copy">...</div>
  <div className="hero-meta">...</div>
  <div className="signal-grid">...</div>
</section>
```

Canvas 样式：

```css
.code-rain-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
```

## 7.2 Canvas 尺寸

需要按 DPR 缩放，避免 Retina 屏幕模糊：

```ts
const dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
canvas.style.width = `${rect.width}px`;
canvas.style.height = `${rect.height}px`;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
```

DPR 上限建议为 2，防止高分屏显著增加绘制开销。

## 7.3 文字避让

通过选择器读取元素位置，并转换到 Hero 局部坐标：

```ts
const blockedRects = selectors
  .map((selector) => hero.querySelector(selector))
  .filter(Boolean)
  .map((element) => {
    const rect = element!.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();

    return {
      left: rect.left - heroRect.left - 32,
      right: rect.right - heroRect.left + 32,
      top: rect.top - heroRect.top - 32,
      bottom: rect.bottom - heroRect.top + 32,
    };
  });
```

绘制前检查字符点是否在任一禁区：

```ts
const blocked = blockedRects.some((rect) =>
  x >= rect.left &&
  x <= rect.right &&
  y >= rect.top &&
  y <= rect.bottom
);
```

对于整列字符，优先在生成列时筛选可用 x 位置，绘制时再做二次检查，减少字符被切断得过于零碎。

## 7.4 响应式更新

使用：

- `ResizeObserver`：Hero 尺寸和文字布局变化；
- `window.resize`：Canvas DPR 和 viewport 更新；
- `document.visibilitychange`：标签页不可见时暂停；
- `matchMedia('(prefers-reduced-motion: reduce)')`：动态偏好；
- 语言状态变化：重新测量禁区和重置列分布。

## 7.5 帧率控制

不需要 60 FPS。建议使用 rAF + 时间间隔限帧：

```ts
const frameInterval = 1000 / 30;

function draw(time: number) {
  requestAnimationFrame(draw);
  if (time - lastFrame < frameInterval) return;
  lastFrame = time;
  // update + render
}
```

## 7.6 淡出方式

不建议使用经典代码雨的整屏半透明黑色覆盖产生长拖影，因为会污染标题区域。

推荐每帧完全清空，再根据字符在列中的位置计算 opacity。这样：

- 禁区更干净；
- 不会留下跨越文字的残影；
- 动画可控；
- 视觉更偏“信号流”，而非 Matrix 复刻。

## 8. 性能策略

1. Canvas 数量保持 1 个；
2. 桌面端字符总量建议不超过 120–160 个；
3. 移动端不超过 40–60 个；
4. DPR 最大为 2；
5. 默认 30 FPS，上限不超过 30 FPS；
6. 页面不可见时暂停；
7. 禁止每一帧读取 DOM 布局；禁区只在 resize、语言切换等事件后更新；
8. 鼠标移动通过 rAF 节流，只更新变量；
9. 不引入 Three.js、tsParticles 等大型依赖；
10. 实现完成后通过 Chrome Performance 检查长任务与帧耗时。

## 9. 无障碍与降级

### 减少动态

当命中：

```css
@media (prefers-reduced-motion: reduce)
```

处理方式：

- 停止网格漂移；
- 停止光团游动；
- 停止轨道旋转；
- 停止信号雨；
- 保留静态轨道、网格和极淡环境光；
- Canvas 可不挂载，或只绘制一帧静态字符。

### 触摸设备

- 关闭鼠标聚光和指针联动；
- 关闭字符排斥；
- 降低字符密度；
- 保证滑动不触发额外计算。

### 可读性

- Canvas 必须 `aria-hidden="true"`；
- `pointer-events: none`；
- 任何动效都不承担语义；
- 确保标题与按钮对比度不因光晕变化而下降。

## 10. 推荐实施顺序

### Phase 1：基础氛围

- 网格缓慢漂移；
- 两个环境光团；
- 轨道旋转；
- 信号点呼吸；
- reduced motion 降级。

### Phase 2：信号雨首版

- 新增 Canvas 组件；
- 轨道内部 4–8 列字符；
- 左右边缘少量字符；
- 固定密度与随机速度；
- 内容区域避让；
- 响应式降级与暂停逻辑。

### Phase 3：细节优化

- 鼠标附近亮度增强；
- 随机关键词节点；
- 蓝色偶发信号；
- 根据实际页面截图调节密度、透明度和速度；
- 决定是否保留扫描纹理。

## 11. 文件改动建议

| 文件 | 改动 |
| --- | --- |
| `src/components/Hero.tsx` | 增加 Hero ref、环境层和 `CodeRain` |
| `src/components/CodeRain.tsx` | 新增 Canvas 信号雨组件 |
| `src/index.css` | 增加信号场、Canvas、轨道与响应式样式 |
| 可选 `src/hooks/useReducedMotion.ts` | 复用减少动态偏好 |

不建议把所有 Canvas 逻辑直接写进 `Hero.tsx`，否则 Hero 会承担过多渲染、测量和动画职责。

## 12. 推荐默认参数

```ts
const SIGNAL_RAIN_CONFIG = {
  desktopFps: 30,
  mobileFps: 24,
  maxDpr: 2,
  desktopColumns: 12,
  mobileColumns: 4,
  minColumnLength: 4,
  maxColumnLength: 10,
  minSpeed: 18,
  maxSpeed: 46,
  fontSize: 11,
  lineHeight: 16,
  safePadding: 32,
  pointerRadius: 220,
};
```

参数应集中维护，避免散落在绘制逻辑中。

## 13. 验收标准

### 视觉

- 首屏第一视觉仍然是大标题；
- 字符雨不穿过标题、简介、按钮和数据区；
- 背景停留 3–5 秒后可感知，但不喧宾夺主；
- 不产生传统“黑客模板”或游戏登录页感；
- lime / blue / coral 与当前网站配色一致；
- 中英文切换后避让区域仍然正确。

### 交互

- 指针移动时聚光流畅，无明显延迟；
- 页面滚动不受 Canvas 影响；
- 手机滑动正常；
- 页面隐藏后停止绘制，返回后恢复；
- reduced motion 下无持续动画。

### 性能

- 动效开启时无明显卡顿；
- Canvas 不触发频繁 layout；
- 普通桌面端帧率稳定在目标范围；
- 移动端不会明显发热或掉帧；
- `npm run typecheck`、`npm run lint`、`npm run build` 全部通过。

## 14. 最终推荐效果

首版以克制为优先：

```text
缓慢漂移的网格
+ 两团非常淡的环境光
+ 极慢旋转的轨道
+ 轨道内部稀疏信号雨
+ 左右边缘各 2–3 个短字符列
+ 完整文字避让
```

先不同时叠加高强度扫描线、粒子连线和大范围鼠标排斥。完成首版并结合真实页面录屏观察后，再决定是否增加第三阶段增强。
