export function init(definition) {
  if (Object.keys(definition).length === 0) {
    throw new Error("No states defined.");
  }

  let value = Object.keys(definition)[0];
  let listeners = [];

  const machine = {
    emit(event) {
      value = definition[value][event];

      listeners.forEach((listener) => listener(machine));

      return value;
    },
    is(comparison) {
      return value === comparison;
    },
    listen(callback) {
      listeners.push(callback);
    }
  };

  return machine;
}

// export function mount(target: Element | null, node: HTMLElement): void {
//   if (!target) {
//     throw new Error("Target not found.");
//   }

//   target.replaceChildren(node);
// }

export function mount(target, component, state) {
  if (!target) {
    throw new Error("Target not found.");
  }

  state.listen((state) => {
    const node = component({ state });

    target.replaceChildren(node);
  });

  const node = component({ state });

  target.replaceChildren(node);
}
