import React from "react";

const Header = ({todos}) => {
  const remaining = todos.filter(item => !item.isCompleted).length
  return (
    <header>
      <h2>My Todos</h2>
      <p className="ms-5">{!remaining
            ? "Set Your Todays Todos !"
            : `${remaining} are Remaining Today Todos ! `}</p>
    </header>
  );
};

export default Header;
