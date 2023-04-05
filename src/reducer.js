export const initalState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "CLEAR_BASKET":
      let myBasket = [];

      return { ...state, basket: myBasket };

    case "ADD_TO_BASKET":
      //logic for adding item to basket

      return {
        ...state, //return everything in state{basket}
        basket: [...state.basket, action.item], //returnging state and basket updated new data
      }; //overwrite current state
    case "REMOVE_FROM_BASKET":
      //logic for removing item from basket
      let newBasket = [...state.basket];
      // we check if product exists
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      if (index >= 0) {
        // if item exists in basket remove it
        newBasket.splice(index, 1); //basket after updating
      } else {
        console.warn(`Can't remove product (id: ${action.id})`);
      }
      return { ...state, basket: newBasket };
    default:
      return state;
  }
};
export default reducer;
