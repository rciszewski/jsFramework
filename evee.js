const depsMap = Map();

function render(element, content) {
  const app = document.querySelector(element);
  if (app !== null) {
    app.innerHTML = content;
  }
}

function reactive(obj) {
  const keys = Object.keys(obj);
  const reactiveObj = {};

  keys.forEach((key) => {
    let value = obj[key];
    Object.defineProperty(reactiveObj, key, {
      get() {
        console.log(`Getting value, ${value}`);
        track(reactiveObj, key);
        return value;
      },
      set(newValue) {
        console.log(`Setting value, ${newValue}`);
        if (newValue !== value) {
          value = newValue;
          trigger(reactiveObj, key);
          renderApp();
        }
      },
    });
  });

  function track(target, key) {
    if (currentEfect) {
      let deps = depsMap.get(target);
      if (!deps) {
        deps = new Map();
        deps.set(target, deps);
      }
     let dep = deps.get(key);
      if (!dep) {
        dep = new Set();
        deps.set(key, dep);
      }
      deps.add();
      console.log(target, key);
    }
  }

  function createEffect(fn){
    
  }


  function trigger(target, key) {
    console.log(target, key);
  }

  return reactiveObj;
}
