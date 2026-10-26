const btn = document.getElementById("enter");

const PAD = 10;        // هامش أمان من حواف الشاشة
const MIN_JUMP = 120;  // أقل مسافة للقفزة (بكسل)

let base = null;       // موقع الزر الأصلي بدون أي transform
let curX = 0;
let curY = 0;

function measure() {
  const r = btn.getBoundingClientRect();
  base = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
}

function resetPosition() {
  btn.style.transition = "none";
  btn.style.transform = "none";
  void btn.offsetWidth; // إجبار المتصفح على تطبيق التغيير
  measure();
  curX = 0;
  curY = 0;
  btn.style.transition = "";
}

function moveButton() {
  if (!base) measure();

  let minX = PAD - base.left;
  let maxX = window.innerWidth - base.right - PAD;
  let minY = PAD - base.top;
  let maxY = window.innerHeight - base.bottom - PAD;

  // في حال كانت الشاشة صغيرة جداً
  if (maxX < minX) minX = maxX = (minX + maxX) / 2;
  if (maxY < minY) minY = maxY = (minY + maxY) / 2;

  let x = curX;
  let y = curY;

  // اختيار موقع جديد بعيد نسبياً عن الموقع الحالي
  for (let i = 0; i < 12; i++) {
    x = minX + Math.random() * (maxX - minX);
    y = minY + Math.random() * (maxY - minY);
    if (Math.hypot(x - curX, y - curY) >= MIN_JUMP) break;
  }

  curX = x;
  curY = y;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

btn.addEventListener("click", moveButton);
window.addEventListener("resize", resetPosition);
window.addEventListener("load", resetPosition);

