document.addEventListener("DOMContentLoaded", function () {
  const fontFamilyButton = document.getElementById("font-family-button");
  const fontFamilyOptions = document.querySelector(".font-family-options");
  const fontSizeDropdown = document.getElementById("font-size");
  const textArea = document.getElementById("textArea"); 

  fontFamilyButton.addEventListener("click", () => {
    fontFamilyOptions.style.display =
      fontFamilyOptions.style.display === "block" ? "none" : "block";
  });

  fontFamilyOptions.addEventListener("click", (event) => {
    const selectedFont = event.target.getAttribute("data-font");
    if (selectedFont) {
      textArea.style.fontFamily = selectedFont;
      fontFamilyOptions.style.display = "none";
    }
  });

  fontSizeDropdown.addEventListener("change", () => {
    const selectedFontSize = fontSizeDropdown.value;
    textArea.style.fontSize = selectedFontSize + "px";
  });

  
  const printButton = document.getElementById("printButton");

  printButton.addEventListener("click", () => {
    printTextAreaContent();
  });

  
  const newDocumentButton = document.getElementById("newDocumentButton");

  newDocumentButton.addEventListener("click", () => {
    textArea.value = "";
  });

  
  const saveButton = document.getElementById("saveButton");

  saveButton.addEventListener("click", () => {
    saveTextAreaContent();
  });

  
  const undoButton = document.getElementById("undoButton");

  undoButton.addEventListener("click", () => {
    document.execCommand("undo", false, null);
  });

  
  const cutButton = document.getElementById("cutButton");

  cutButton.addEventListener("click", () => {
    document.execCommand("cut", false, null);
  });

  
  const copyButton = document.getElementById("copyButton");

  copyButton.addEventListener("click", () => {
    document.execCommand("copy", false, null);
  });

  
  const pasteButton = document.getElementById("pasteButton");

pasteButton.addEventListener("click", () => {
  textArea.focus(); // Ensure that the textArea has focus before pasting
  document.execCommand("paste");
  });

 
  const fullScreenButton = document.getElementById("FullScreenButton");

  fullScreenButton.addEventListener("click", () => {
    toggleFullScreen();
  });

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      textArea.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  
  const previewButton = document.getElementById("previewButton");
  const previewOverlay = document.createElement("div");
  previewOverlay.className = "preview-overlay";

  previewButton.addEventListener("click", () => {
    togglePreview();
  });

  function togglePreview() {
    if (!document.body.contains(previewOverlay)) {
      previewOverlay.innerHTML = textArea.value;
      document.body.appendChild(previewOverlay);
    } else {
      document.body.removeChild(previewOverlay);
    }
  }
  const imageButton = document.getElementById("imageButton");
  const imageInput = document.getElementById("imageInput");

  imageButton.addEventListener("click", () => {
    imageInput.click();
  });

  imageInput.addEventListener("change", (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const selectedText = `<img src="${imageUrl}" alt="Image">`;
        insertTextAtCursorPosition(selectedText);
      };
      reader.readAsDataURL(imageFile);
    }
  });
  const linkButton = document.getElementById("linkButton");

  linkButton.addEventListener("click", () => {
    const linkUrl = prompt("Enter the URL of the link:");
    if (linkUrl) {
      const linkText = prompt("Enter the link text:");
      if (linkText) {
        const selectedText = `<a href="${linkUrl}" target="_blank">${linkText}</a>`;
        insertTextAtCursorPosition(selectedText);
      }
    }
  });
  const sourcecodeButton = document.getElementById("scButton");

  sourcecodeButton.addEventListener("click", () => {
    const selectedText = window.getSelection().toString();
    const newText = `<code>${selectedText}</code>`;

    insertTextAtCursorPosition(newText);
  });

 
  const wordcountButton = document.getElementById("wcButton");

  wordcountButton.addEventListener("click", () => {
    const words = textArea.value
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    alert(`Word count: ${words}`);
  });

  const boldButton = document.getElementById("BoldButton");
  const textAreaID = document.getElementById("textArea");
  const underlineButton = document.getElementById("underlineButton");
  const alignlButton = document.getElementById("alignlButton");
  const aligncButton = document.getElementById("aligncButton");
  const alignrButton = document.getElementById("alignrButton");
  const justifyButton = document.getElementById("justifyButton");
  const indentButton = document.getElementById("indentButton");
  const outdentButton = document.getElementById("outdentButton");

  boldButton.addEventListener("click", () => {
    textAreaID.classList.toggle("bold-text");
   
  });

  underlineButton.addEventListener("click", () => {
    textAreaID.classList.toggle("underline-text");
    
  });

  alignlButton.addEventListener("click", () => {
    textAreaID.classList.remove("alignc-text", "alignr-text");
    textAreaID.classList.toggle("alignl-text");
  });
  
  aligncButton.addEventListener("click", () => {
    textAreaID.classList.remove("alignl-text", "alignr-text");
    textAreaID.classList.toggle("alignc-text");
  });
  
  alignrButton.addEventListener("click", () => {
    textAreaID.classList.remove("alignl-text", "alignc-text");
    textAreaID.classList.toggle("alignr-text");
  });

  justifyButton.addEventListener("click", () => {
    textAreaID.classList.toggle("justify-text");
  });

  indentButton.addEventListener("click", () => {
    textAreaID.classList.toggle("indent-text");
  });

  outdentButton.addEventListener("click", () => {
    textAreaID.classList.toggle("outdent-text");
  });
});

// Print and Save functions are the same as before
function printTextAreaContent() {
  const textArea = document.getElementById("textArea"); // Change this to your textarea ID
  const printWindow = window.open("", "_blank");
  printWindow.document.write("<pre>" + textArea.value + "</pre>");
  printWindow.document.close();
  printWindow.print();
}

function saveTextAreaContent() {
  const textArea = document.getElementById("textArea"); 
  const content = textArea.value;
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "document.txt";
  a.click();
  URL.revokeObjectURL(url);
}
function insertTextAtCursorPosition(text) {
  const textArea = document.getElementById("textArea");
  const startPos = textArea.selectionStart;
  const endPos = textArea.selectionEnd;
  textArea.value =
    textArea.value.substring(0, startPos) +
    text +
    textArea.value.substring(endPos);
}
