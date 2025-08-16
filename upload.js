const { Client, Storage, ID } = Appwrite;
function hamburg() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(0px)";
}
function cancel() {
  const navbar = document.querySelector(".dropdown");
  navbar.style.transform = "translateY(-500px)";
}
const client = new Client()
  .setProject("675d98b10002e645460a");
let loading = false;
document
  .getElementsByClassName("file")[0]
  .addEventListener("change", function () {
    const label = document.querySelector(".notes-upload-widget label");
    label.childNodes[2].textContent = " " + this.files[0].name;
    label.querySelector("i").className = "fa fa-check";
    const button = document.querySelector(".notes-upload-widget button");
    button.style.backgroundColor = "#0000FF";
    button.addEventListener("mouseenter", function () {
      button.style.transform = "scale(1.1)";
      button.style.color = "#0000ff";
      button.style.border = "2px solid #0000ff";
      button.style.backgroundColor = "transparent";
      button.style.fontWeight = "700";
      button.style.boxShadow = "0 0 40px 5px #0000ff";
    });
    button.addEventListener("mouseleave", function () {
      button.style.transform = "";
      button.style.color = "";
      button.style.border = "";
      button.style.backgroundColor = "#0000FF";
      button.style.fontWeight = "";
      button.style.boxShadow = "";
    });
  });
document
  .querySelector(".notes-upload-widget button")
  .addEventListener("click", function () {
    if (document.querySelector(".file").files.length !== 0 && loading==false) {
      loading = true;
      document.querySelector(".notes-upload-widget button").textContent =
    "Uploading...";
      const storage = new Storage(client);
      const fileInput = document.querySelector(".file").files[0];
      storage
        .createFile("675da4d20032d2f17601", ID.unique(), fileInput)
        .then((response) => {
          document.querySelector(".notes-upload-widget button").textContent = "Uploaded";
          loading = false;
          console.log(JSON.stringify(response));
          window.location.href = "chat.html?file=" + response["$id"] + "&buckID=" + response["bucketId"] + "&name=" + response["name"]+ "&size=" + response["sizeOriginal"];
        })
        .catch((error) => {
          alert("Error Uploading File: " + error.message);
          loading = false;
          document.querySelector(".notes-upload-widget button").textContent = "Upload";
        });
    }
  });
