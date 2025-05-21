const fullname = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message").value.trim();

if (!name || !email || !message) {
  statusMessage.textContent = "❌ من فضلك املأ جميع الحقول.";
  statusMessage.style.color = "red";
  return;
}

// حفظ البيانات في localStorage (اختياري للتجربة فقط)
const feedbackList = JSON.parse(localStorage.getItem("feedbackList") || "[]");
feedbackList.push({
  name: fullname,
  email: email,
  message: message,
  date: new Date().toLocaleString()
});
localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

statusMessage.textContent = "✅ شكراً لك! تم إرسال رسالتك بنجاح.";
statusMessage.style.color = "green";

form.reset();
