const deleteModal = document.getElementById("delete-modal");
const openDeleteModalButton = document.getElementById("open-delete-modal");
const cancelDeleteModalButton = document.getElementById("cancel-delete-modal");
const modalBackdrop = deleteModal?.querySelector("[data-close-modal]");

if (deleteModal && openDeleteModalButton && cancelDeleteModalButton && modalBackdrop) {
  const toggleModal = (isOpen) => {
    deleteModal.classList.toggle("is-open", isOpen);
    deleteModal.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("modal-open", isOpen);

    if (isOpen) {
      cancelDeleteModalButton.focus();
    } else {
      openDeleteModalButton.focus();
    }
  };

  openDeleteModalButton.addEventListener("click", () => {
    toggleModal(true);
  });

  cancelDeleteModalButton.addEventListener("click", () => {
    toggleModal(false);
  });

  modalBackdrop.addEventListener("click", () => {
    toggleModal(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && deleteModal.classList.contains("is-open")) {
      toggleModal(false);
    }
  });
}
