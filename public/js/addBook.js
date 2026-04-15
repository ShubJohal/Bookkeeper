document.getElementById("find-cover-button").addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    // Show loading text while fetching cover
    document.querySelector(".cover-preview").style.display = "none";
    document.querySelector(".cover-status").style.display = "none";
    document.querySelector(".cover-text").style.display = "block";


    if (title && author) {
        try {
            const response = await fetch("/books/get-book-cover", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, author }),
            });
          
            console.log(response.status);
            console.log(response.statusText);

            // Check if response is not ok (e.g., 404 or 500)
            if (!response.ok) {
                document.querySelector(".cover-text").style.display = "none";
                document.querySelector(".cover-status").textContent = "Failed to fetch cover. Please try again. ";
                throw new Error("Failed to fetch cover"); 
            }
            // if response is null, it means books doest not exists
            const responseData = await response.json();
            console.log("This is the response data:", responseData);
            if (responseData.coverUrl === null) {
                document.querySelector(".cover-text").style.display = "none";
                document.querySelector(".cover-status").style.display = "block";
                document.querySelector(".cover-status").textContent = "No cover found. Please upload manually";
                return;
            }
            //If respnose is Ok and data exists, show the cover found message


            document.querySelector(".cover-text").style.display = "none";
            document.querySelector(".cover-status").style.display = "block";
            document.querySelector(".cover-status").textContent = "Cover found! It will be added to your book entry.";
    

            console.log(responseData); // 👈 TEMP: see what backend returns

            // next step → update UI here
                document.querySelector(".upload-text").style.display = "none";
                document.querySelector(".upload-subtext").style.display = "none";
                document.querySelector(".upload-icon").style.display = "none";
                const coverImage = document.getElementById("cover-preview");
                coverImage.src = responseData.coverUrl;
                coverImage.style.display = "block";
                document.getElementById("book_cover").value = responseData.coverUrl; // Set hidden input value to cover URL 



        } catch (error) {
            console.error("Error fetching book cover:", error);
        }
    }
});

//Cancel button functionality
document.getElementById("cancel-button").addEventListener("click", () => {
    // take user back to library page
    window.location.href = "/";
});

// Optional: Add event listener to file input for manual cover upload
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("bookCoverFile");

uploadBox.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    uploadBox.querySelector(".upload-text").textContent = fileName;
  }
});

uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("dragging");
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("dragging");
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("dragging");

  const files = e.dataTransfer.files;
  fileInput.files = files;

  uploadBox.querySelector(".upload-text").textContent = files[0].name;
});

const addBookForm = document.querySelector(".add-book-form");
const submitButton = addBookForm?.querySelector(".submit-button");
const cancelButton = document.getElementById("cancel-button");

if (addBookForm && submitButton) {
  addBookForm.addEventListener("submit", () => {
    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitButton.textContent = "Saving...";

    if (cancelButton) {
      cancelButton.disabled = true;
    }
  });
}
