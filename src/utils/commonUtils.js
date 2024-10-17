export const matchFileName = (fileTrees, name) => {
  let result = null;
  //   匹配目录名称相符的第一个文件
  result = fileTrees.find((e) => name.includes(e.filename));
  if (result) return result;
  fileTrees.forEach((tree) => {
    result = tree.children ? matchFileName(tree.children, name) : null;
    if (result) return result;
  });
  return result;
};

export const loadAsyncCdn = (src) => {
  const cdnScript = document.createElement("script");
  cdnScript.setAttribute("src", src);
  document.body.append(cdnScript);
  return new Promise((res, rej) => {
    cdnScript.onload = () => {
      res(`load ${src} success`);
    };
    cdnScript.onerror = (err) => {
      rej(err);
    };
  });
};

export const renderShadowRoot = (contentObj) => {
  // const container = shadowRootContainer.value;
  // const container = document.getElementById('shadowRoot');
  let shadowRoot = document.getElementById("shadowRootFrame");

  if (!shadowRoot) {
    const curShadowRoot = document.createElement("div");
    curShadowRoot.setAttribute("id", "shadowRootFrame");
    document.body.appendChild(curShadowRoot);
    shadowRoot = curShadowRoot.attachShadow({ mode: "open" });
    window.innerShadowRoot = shadowRoot;
  } else {
    shadowRoot.innerHTML = "";
  }
  // const style = document.createElement('style');
  // style.type = 'text/css';
  // style.appendChild(document.createTextNode(contentObj.cssContent));
  // shadowRoot.appendChild(style);

  const content = document.createElement("div");
  content.innerHTML = `<div class="wasai">woopop<div>`;
  // shadowRoot.appendChild(content);
};
