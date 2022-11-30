import { Component } from "react";
import { Button } from "react-bootstrap";
import Item from "../Item/Item";
import styles from "./Items.module.scss";

/**
 * Я винесла функцію submitHandler до батьківського компонента ToDo, щоб не змінювати тут пропси, що ми намагалися робить в данному компоненті
 * це некорректно, тому що props імутабельні і ми не можемо напряму їх присвоювати змінним, a ми намагалися
 * присвоїти props items змінній filter. З хуками це працювало, бо там є хук useEffect
 * !!!! Увага я перейменувала submitHandler в filterHandler, так буде коректніше
 * Можно взагалі функціонал пошуку/скидання винести в окремий компонент та розмістити на батьківському компоненті.
 * А цей комонент буде відповідати тількі за відображення данних, не знаючи фільтровані записи чи ні. І буде незалежним, як
 * справжній React Component
 */
class Items extends Component {
  state = {
    term: "",
    error: "",
  };

  reset = () => {
    this.setState((prev) => {
      return { ...prev, term: "" };
    });
    this.props.filterHandler("");
  };
  showMessage = (message) => {
    this.setState((prev) => {
      return { ...prev, error: message };
    });

    setTimeout(() => {
      this.setState((prev) => {
        return { ...prev, error: "" };
      });
    }, 3000);
  };

  messageError = (message) => {
    this.showMessage(message);
  };

  render() {
    return (
      <>
        {this.state.error !== "" ||
        (this.props.parrentError && this.props.parrentError !== "") ? (
          <p>{`${this.state.error}${this.props.parrentError}`}</p>
        ) : null}
        <div className={styles.search_bar}>
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              value={this.state.term}
              placeholder="Пошук"
              onChange={(e) => {
                this.setState((prev) => {
                  return { ...prev, term: e.target.value };
                });
              }}
            />
            <Button
              onClick={() => this.props.filterHandler(this.state.term)}
              variant="outline-primary"
            >
              Пошук
            </Button>
            <Button onClick={() => this.reset()} variant="outline-primary">
              Скинути
            </Button>
          </form>
        </div>
        <div>
          <ul className={styles.items}>
            {this.props.items.map((item, i) => (
              <Item
                key={`${item.text}-${i}`}
                item={item}
                updateItems={this.props.updateItems}
                messageError={this.messageError}
              />
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default Items;
