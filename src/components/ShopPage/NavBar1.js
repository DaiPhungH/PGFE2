import React from 'react';

const Navbar = ({ categories, onSelectCategory, selectedCategory }) => {
  // Include "Mac" category manually in the list of categories
  const updatedCategories = ['Mac', ...categories];

  return (
    <div style={styles.navbar}>
      <h2>Categories</h2>
      <ul style={styles.navList}>
        <li
          style={selectedCategory === '' ? { ...styles.navItem, ...styles.selected } : styles.navItem}
          onClick={() => onSelectCategory('')}
        >
          All
        </li>
        {updatedCategories.map((category, i) => (
          <li
            key={i}
            style={selectedCategory === category ? { ...styles.navItem, ...styles.selected } : styles.navItem}
            onClick={() => onSelectCategory(category)}
          >
            {category.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  navbar: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    fontFamily: 'Roboto, sans-serif',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    cursor: 'pointer',
    padding: '10px 0',
    fontSize: '16px',
    color: '#333',
    textTransform: 'uppercase',
    transition: 'font-weight 0.3s ease', // Optional transition effect
  },
  selected: {
    fontWeight: 'bold',
    color: '#007bff',
  },
};

export default Navbar;
