const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag === "function") {
      return tag(props);
    }

    const element = {
      tag,
      props: {
        ...props,
        children
      }
    };
    return element;
  }
};

const states = [];
let stateCursor = 0;

const useState = initialState => {
  const FROZENCURSOR = stateCursor;
  states[FROZENCURSOR] = states[FROZENCURSOR] || initialState;
  console.log(states);
  let setState = newState => {
    states[FROZENCURSOR] = newState;
    rerender();
  };

  stateCursor++;

  return [states[FROZENCURSOR], setState];
};

const render = (reactElement, container) => {
  const actualDomElement = document.createElement(reactElement.tag);
  if (["string", "number"].includes(typeof reactElement)) {
    container.appendChild(document.createTextNode(String(reactElement)));
    return;
  }

  if (reactElement.props) {
    Object.keys(reactElement.props)
      .filter(prop => prop !== "children")
      .forEach(prop => (actualDomElement[prop] = reactElement.props[prop]));
  }

  if (reactElement.props.children) {
    reactElement.props.children.forEach(child =>
      render(child, actualDomElement)
    );
  }
  container.appendChild(actualDomElement);
};

const App = () => {
  const [title, setTitle] = useState("react");
  const [count, setCount] = useState(0);
  return (
    <div className="our-element">
      <h1>Hello, welcome to {title}</h1>
      <input
        type="text"
        value={title}
        onchange={e => setTitle(e.target.value)}
        placeholder="name"
      />
      <h2>The count is {count}</h2>
      <button onclick={e => setCount(count + 1)}> +</button>
      <button onclick={e => setCount(count - 1)}> -</button>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
        impedit nesciunt ducimus deserunt voluptatum non eius atque aut commodi
        dignissimos, a voluptatibus omnis vel quod consequatur amet qui corrupti
        voluptatem!
      </p>
    </div>
  );
};

<App />;

const rerender = () => {
  document.querySelector("#app").firstChild.remove();
  render(<App />, document.querySelector("#app"));
};

render(<App />, document.querySelector("#app"));
