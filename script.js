// سطر الأوامر: يكتب أوامر الورشة واحدًا بعد الآخر
const commands = ["code .", "git push origin main", "deploy --to cloud"];
const output = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (output) {
  if (reduceMotion) {
    output.textContent = commands[1];
  } else {
    let index = 0;      // الأمر الحالي
    let chars = 0;      // عدد الحروف الظاهرة
    let deleting = false;

    const tick = () => {
      const command = commands[index];
      output.textContent = command.slice(0, chars);

      if (!deleting && chars < command.length) {
        chars++;
        return setTimeout(tick, 90);
      }
      if (!deleting) {
        deleting = true;
        return setTimeout(tick, 1400);
      }
      if (chars > 0) {
        chars--;
        return setTimeout(tick, 40);
      }
      deleting = false;
      index = (index + 1) % commands.length;
      setTimeout(tick, 400);
    };

    tick();
  }
}

// سنة التذييل
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
