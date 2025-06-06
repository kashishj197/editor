import { useRef, useEffect } from "react";

// @ts-ignore
function createRootElement(id) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
}

// @ts-ignore
function addRootElement(rootElem) {
  document.body.insertBefore(
    rootElem,
    // @ts-ignore
    document.body.lastElementChild.nextElementSibling
  );
}

// @ts-ignore
function usePortal(id) {
  const rootElemRef = useRef(null);

  useEffect(() => {
    const node = document.createElement("div");
    document.body.appendChild(node);
    const existingParent = node;
    const parentElem = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parentElem);
    }

    // @ts-ignore
    parentElem.appendChild(rootElemRef.current);

    return function removeElement() {
      // @ts-ignore
      rootElemRef.current.remove();
      node.remove();
      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getRootElem() {
    if (!rootElemRef.current) {
      // @ts-ignore
      rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  }

  return getRootElem();
}

export default usePortal;
