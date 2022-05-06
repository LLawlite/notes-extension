document.addEventListener("DOMContentLoaded", function () {
  const test = document.querySelector("#test");
  const text = document.querySelector("#selectedtext");
  const title=document.querySelector('#notetitle');
  test.addEventListener("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: `document.getSelection().toString()` },
        (result) => {
          text.innerHTML = result;
          title.innerHTML=tabs[0].title;
        }
      );
    });
  });
  var doc = new jsPDF();
  var specialElementHandlers = {
    "#editor": function (element, renderer) {
      return true;
    },
  };

  $("#cmd").click(function () {
    doc.fromHTML($("#content").html(), 15, 15, {
      width: 170,
      elementHandlers: specialElementHandlers,
    });
    doc.save("sample-file.pdf");
  });
});
