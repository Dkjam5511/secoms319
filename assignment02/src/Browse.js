import items from "./products.json";

const Browse = () => {
  const listItems = items.map((el) => (
    <div key={el.id}>
      <img class="img-fluid" src={el.image} />
      {el.title}
      {el.category}
      {el.price}
    </div>
  ));

  return <div>{listItems}</div>;
};
export default Browse;
