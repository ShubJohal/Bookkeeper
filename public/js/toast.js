function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");

  if (!toastContainer || !message) {
    return;
  }

  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

const urlParams = new URLSearchParams(window.location.search);
const successMessage = urlParams.get("success");

if (successMessage) {
  showToast(successMessage, "success");

  urlParams.delete("success");
  const nextQuery = urlParams.toString();
  const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
}
