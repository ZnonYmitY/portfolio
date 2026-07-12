# AI 信号场与信号雨：Hero 背景动效实施规范

> 分支：`codex/rebuild-avery-portfolio`  
> 适用文件：`src/components/Hero.tsx`、`src/index.css`  
> 建议新增：`src/components/HeroSignalRain.tsx`  
> 目标：让 Codex 可直接据此完成首屏背景动效，不改变现有文案与主要布局。

## 1. 设计目标

Hero 应呈现为一个安静运行中的 AI 产品系统：

- 网格代表结构与计算空间；
- 轨道代表模型、产品与系统协同；
- 缓慢光场代表智能的演化；
- 信号雨代表模型信号与后台信息流；
- 鼠标聚光代表人的参与。

第一视觉必须始终是主标题，其次是简介和 CTA。背景动效只能在用户停留数秒后被感知，不能做成满屏、高亮、传统黑客模板式代码雨。

## 2. 当前页面基础

现有 Hero 已包含：

- 深色底色与径向渐变；
- 64px 网格；
- 右上圆形轨道、两条椭圆轨迹和 coral 信号点；
- `INSIGHT / MODEL / SYSTEM` 标签；
- 主标题、简介、按钮、Meta 和 Signal Grid。

新增动效应复用现有色彩：

```css
--ink: #0b0e0d;
--paper: #f3f3ea;
--lime: #d8ff53;
--coral: #ff776b;
--blue: #6cc9ff;
```

不使用传统 Matrix 纯绿色，不复制日文假名排布。

## 3. 最终组合

首版采用以下组合：

```text
缓慢漂移的背景网格
+ lime / blue 两团极淡环境光
+ 鼠标附近柔和聚光（仅桌面端）
+ 两条轨道反向慢速旋转
+ coral 圆点呼吸
+ 轨道内 5～7 列稀疏信号雨
+ 页面左右边缘少量短字符列（第二阶段）
+ 完整文字避让
```

不同时加入粒子连线、标题 glitch、鼠标尾迹、强扫描线或视频背景。

---

# Part A：AI Signal Field / AI 信号场

## 4. DOM 与视觉层级

在 `Hero.tsx` 中给 Hero 增加 ref，并在内容前加入环境层：

```tsx
const heroRef = useRef<HTMLElement>(null);

<section ref={heroRef} className="hero" id="top">
  <div className="hero-ambient" aria-hidden="true">
    <span className="ambient-blob ambient-lime" />
    <span className="ambient-blob ambient-blue" />
  </div>

  <HeroSignalRain hostRef={heroRef} />

  <div className="hero-orbit" aria-hidden="true">...</div>
  <div className="hero-copy">...</div>
  <div className="hero-meta">...</div>
  <div className="signal-grid">...</div>
</section>
```

推荐层级：

```text
z-index: 3  主标题、简介、按钮、Meta、Signal Grid
z-index: 2  轨道、标签、信号点
z-index: 1  信号雨 Canvas
z-index: 0  环境光、鼠标聚光、网格
```

Hero 增加：

```css
.hero {
  position: relative;
  overflow: clip;
  isolation: isolate;
  --pointer-x: 76%;
  --pointer-y: 24%;
  --parallax-x: 0px;
  --parallax-y: 0px;
}
```

## 5. 网格漂移

复用现有 `.hero::before`，只增加慢速位移：

```css
.hero::before {
  animation: grid-drift 28s linear infinite;
}

@keyframes grid-drift {
  to { background-position: 64px 64px; }
}
```

约束：

- 周期范围 `24s～36s`，默认 `28s`；
- 不低于 `18s`；
- 不提高现有网格亮度；
- Hero 下部继续通过 mask 渐隐。

## 6. 环境光团

```css
.hero-ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.ambient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  will-change: transform;
}

.ambient-lime {
  width: min(52vw, 720px);
  aspect-ratio: 1;
  right: -16%;
  top: -25%;
  opacity: 0.14;
  background: rgba(216,255,83,.7);
  animation: ambient-lime-drift 16s ease-in-out infinite alternate;
}

.ambient-blue {
  width: min(38vw, 540px);
  aspect-ratio: 1;
  left: -15%;
  bottom: -22%;
  opacity: 0.08;
  background: rgba(108,201,255,.7);
  animation: ambient-blue-drift 20s ease-in-out infinite alternate;
}
```

参数范围：

- Lime 透明度 `0.10～0.16`；
- Blue 透明度 `0.05～0.10`；
- 模糊 `80～100px`；
- 位移幅度小于 60px；
- scale 控制在 `0.94～1.08`。

## 7. 鼠标聚光与轻微视差

在 Hero 内监听 `pointermove`，通过 `requestAnimationFrame` 更新 CSS 变量，不直接触发 React state：

```tsx
useEffect(() => {
  const hero = heroRef.current;
  if (!hero) return;

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (reduceMotion) return;

  let frame = 0;

  const onPointerMove = (event: PointerEvent) => {
    const rect = hero.getBoundingClientRect();
    if (
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom
    ) return;

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const nx = x / rect.width - 0.5;
      const ny = y / rect.height - 0.5;

      hero.style.setProperty('--pointer-x', `${x}px`);
      hero.style.setProperty('--pointer-y', `${y}px`);
      hero.style.setProperty('--parallax-x', `${nx * 22}px`);
      hero.style.setProperty('--parallax-y', `${ny * 16}px`);
    });
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onPointerMove);
  };
}, []);
```

聚光：

```css
.hero-ambient::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    420px circle at var(--pointer-x) var(--pointer-y),
    rgba(216,255,83,.11),
    rgba(216,255,83,.03) 38%,
    transparent 72%
  );
}
```

移动端与 `pointer: coarse` 下关闭聚光。不对标题做 3D 倾斜或跟随变形。

## 8. 轨道运动

```css
.orbit-one { animation: orbit-one-spin 24s linear infinite; }
.orbit-two { animation: orbit-two-spin 19s linear infinite reverse; }
.orbit-dot { animation: orbit-dot-pulse 2.8s ease-in-out infinite; }
```

注意：轨道关键帧必须保留原有 `scaleY()`，否则椭圆会在动画开始后恢复成圆形。轨道整体透明度建议控制在 `0.45～0.58`。

---

# Part B：AI Signal Rain / AI 信号雨

## 9. 技术方案

新增：

```text
src/components/HeroSignalRain.tsx
```

使用单个 Canvas 实现，不安装 Three.js、tsParticles 或其他大型库，不使用 gif、mp4 或预生成图片。

推荐接口：

```tsx
type HeroSignalRainProps = {
  hostRef: React.RefObject<HTMLElement>;
  avoidSelectors?: string[];
  orbitSelector?: string;
};
```

默认避让：

```ts
const DEFAULT_AVOID_SELECTORS = [
  '.hero-copy',
  '.hero-bottom',
  '.hero-meta',
  '.signal-grid'
];
```

## 10. 字符集

```ts
const GLYPHS = [
  '0', '1', '<>', '{}', '::', '/>',
  'AI', 'PM', 'AGENT', 'MODEL', 'SYSTEM',
  'SEARCH', 'VISION', 'BUILD', 'CREATE', 'SHIP'
];
```

规则：

- 单字符出现频率高于单词；
- 不连续堆叠长单词；
- 中文页面仍以数字、符号和英文短词为主；
- 不复刻电影中的字形、字符组合或满屏排布。

## 11. 信号列模型

```ts
type SignalColumn = {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  fontSize: number;
  glyphs: string[];
  region: 'orbit' | 'left-edge' | 'right-edge' | 'gap';
  delay: number;
  active: boolean;
};
```

默认参数：

```ts
const SIGNAL_RAIN_CONFIG = {
  desktopFps: 30,
  mobileFps: 24,
  maxDpr: 2,
  desktopColumns: 12,
  mobileColumns: 4,
  firstPhaseOrbitColumns: 6,
  minColumnLength: 5,
  maxColumnLength: 12,
  minDuration: 6000,
  maxDuration: 14000,
  minFontSize: 10,
  maxFontSize: 13,
  safePadding: 28,
};
```

透明度：

- 普通字符 `0.04～0.15`；
- 列头字符 `0.18～0.35`；
- glow 只用于列头，模糊 `4～9px`；
- 平均亮度必须低于 eyebrow 和轨道标签。

## 12. Canvas 高清适配

```ts
const dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = Math.floor(width * dpr);
canvas.height = Math.floor(height * dpr);
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
```

样式：

```css
.hero-signal-rain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
```

Canvas 必须 `aria-hidden="true"`。

## 13. 区域分布

不要在整个 Hero 内完全随机生成列。按候选区域生成：

### Orbit Region

- 右上轨道内部与周边；
- 首版只实现这里；
- 5～7 列；
- 透明度略高于边缘列；
- 可使用圆形 clip。

### Left Edge

- 页面左侧 0%～10%；
- 第二阶段增加 2～3 个短列。

### Right Edge

- 页面右侧 90%～100%；
- 第二阶段增加 2～3 个短列；
- 避开轨道标签。

### Open Gap

- 从文字禁区之外的空白区域中选择；
- 最多 1～2 列；
- 没有安全空间则不生成。

## 14. 轨道内裁剪

轨道位置必须实时读取 `.hero-orbit` 的 `getBoundingClientRect()`，转换为 Hero 局部坐标，不能写死。

```ts
ctx.save();
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
ctx.clip();
// draw orbit columns
ctx.restore();
```

`INSIGHT / MODEL / SYSTEM` 标签也要加入避让区域，不能被字符覆盖。

## 15. 文字避让

使用 `getBoundingClientRect()` 获取避让区域，并扩展默认 28px 安全边距：

```ts
function getBlockedRects(host: HTMLElement, selectors: string[]) {
  const hostRect = host.getBoundingClientRect();

  return selectors.flatMap((selector) => {
    const element = host.querySelector<HTMLElement>(selector);
    if (!element) return [];

    const rect = element.getBoundingClientRect();
    const padding = 28;

    return [{
      left: rect.left - hostRect.left - padding,
      top: rect.top - hostRect.top - padding,
      right: rect.right - hostRect.left + padding,
      bottom: rect.bottom - hostRect.top + padding,
    }];
  });
}
```

每个 glyph 绘制前都要做矩形碰撞检测，不能只检测列的起点。列生成时先筛选可用 x，绘制时再做二次检测。

使用 `ResizeObserver` 监听 Hero 与主要内容尺寸。中英文切换后必须重新测量，禁止写死中文或英文布局坐标。

## 16. 动画行为

- 每列速度、长度、透明度、启动延迟独立随机；
- 列头最亮，后续字符逐级衰减；
- 到达区域底部后先淡出再重置；
- 不允许所有列同步重置；
- 字符可低频随机替换；
- 每帧完整清空并重绘，不用传统整屏黑色半透明覆盖制造长拖影；
- 不留下穿越文字区域的残影。

## 17. 性能

- 单个 Canvas；
- 桌面端 30 FPS，移动端 24 FPS；
- DPR 最大为 2；
- 桌面字符总量不超过 120～160；
- 移动端不超过 40～60；
- `requestAnimationFrame` + 时间间隔限帧；
- `IntersectionObserver`：Hero 离开视口后暂停；
- `visibilitychange`：标签页隐藏后暂停；
- 禁止每帧调用 `getBoundingClientRect()`；
- 所有 observer、listener、animation frame 在卸载时清理。

## 18. 响应式与减少动态

### Desktop

- 完整信号场；
- 鼠标聚光；
- 轨道内 5～7 列，第二阶段总列数 10～14。

### Tablet

- 总列数 6～8；
- 降低光团透明度；
- 关闭复杂视差。

### Mobile / pointer: coarse

- 关闭鼠标聚光；
- 只保留轨道区域 3～5 列；
- blur 降至约 64px；
- glow 减半或关闭；
- 无足够空间时只绘制一帧静态字符。

### prefers-reduced-motion

Canvas 必须主动检测，CSS 规则无法自动停止 rAF：

- 不启动持续 Canvas 动画；
- 网格、光团、轨道停止；
- 可保留静态网格、轨道和极淡字符。

---

# Part C：实施顺序与验收

## 19. Codex 实施顺序

1. 阅读现有 `Hero.tsx` 与 Hero 相关 CSS。
2. 为 Hero 增加 ref，保持文案和布局不变。
3. 加入 `hero-ambient`。
4. 完成网格、光团、轨道和信号点动画。
5. 新建 `HeroSignalRain.tsx`。
6. 完成 Canvas DPR 适配。
7. 读取轨道位置并完成圆形裁剪。
8. 完成文字避让与 ResizeObserver。
9. 完成限帧、视口暂停、标签页暂停。
10. 完成移动端、粗指针和 reduced-motion 降级。
11. 中英文分别测试桌面和移动端。
12. 执行：

```bash
npm run typecheck
npm run lint
npm run build
```

## 20. 视觉验收

- 第一眼仍然先看到大标题；
- 停留 3～5 秒后才明显感知背景运动；
- 字符不覆盖标题、简介、按钮、Meta、Signal Grid 和轨道标签；
- 轨道和信号雨属于同一个视觉系统；
- 不呈现传统“黑客模板”、游戏登录页或赌场霓虹感；
- 中英文切换后避让仍正确；
- 页面滚动和 Avery Twin 交互不受影响。

## 21. 调参优先级

效果过满时按以下顺序调整：

1. 减少代码列数；
2. 降低字符透明度；
3. 删除轨道外字符；
4. 降低环境光透明度；
5. 删除扫描纹理；
6. 最后才考虑修改轨道尺寸。

禁止为了容纳背景效果而缩小标题或改变主要内容位置。

---

# Part D：是否需要提前生图

## 22. 结论

**实现本方案不需要提前生图。**

全部视觉由以下方式实时生成：

- CSS gradient；
- CSS animation；
- Canvas 文字绘制；
- React ref、DOM 测量与 observer。

不需要：

- AI 背景图；
- 代码雨 gif；
- mp4 视频背景；
- WebGL 纹理；
- 字符贴图；
- 电影风格参考图切片。

实时生成的优势：

1. 能适配中英文标题宽度和换行；
2. 能精确避开文字与按钮；
3. 能按屏幕尺寸动态调整密度；
4. 能支持 reduced-motion；
5. 不存在图片清晰度、比例和加载问题；
6. 更容易保持原创视觉，不直接模仿现有影视素材。

只有未来制作社交分享封面、README 截图、演示视频封面时才需要静态图；这些资源应在真实动效完成后，通过页面截图或录屏产生，而不是提前使用生图模型推测最终效果。

## 23. 首版范围

首版只完成：

```text
基础信号场
+ 轨道内 5～7 列信号雨
+ 完整文字避让
+ 中英文适配
+ 响应式和 reduced-motion
```

页面边缘字符、鼠标靠近字符增亮、偶发 blue 信号均放到第二阶段。先保证克制、稳定、可读，再根据真实页面录屏调参。
