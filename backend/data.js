import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Gaby',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
    },
  ],

  products: [
    {
      name: "And Then There Were None",
      image: "/images/p1.jpg",
      price: 7.99,
      countInStock: 10,
      rating: 4.5,
      description: "by Agatha Christie",
    },
    {
      name: "Alice's Adventures in Wonderland",
      image: "/images/p2.jpg",
      price: 10.0,
      countInStock: 20,
      rating: 4.0,
      description: "by Lewis Carroll",
    },
    {
      name: "Harry Potter and the Goblet of Fire",
      image: "/images/p3.jpg",
      price: 11.69,
      countInStock: 10,
      rating: 4.8,
      description: "by J.K. Rowling, Mary GrandPre (Illustrator)",
    },
    {
      name: "Anne of Green Gables",
      image: "/images/p4.jpg",
      price: 7.99,
      countInStock: 15,
      rating: 4.5,
      description: "by L.M. Montgomery",
    },
    {
      name: "Bridge to Terabithia",
      image: "/images/p5.jpg",
      price: 7.99,
      countInStock: 5,
      rating: 4.5,
      description: "by Katherine Paterson, Donna Diamond (Illustrator)",
    },
    {
      name: "Harry Potter and the Sorcerer's Stone",
      image: "/images/p6.jpg",
      price: 8.99,
      countInStock: 12,
      rating: 4.5,
      description: "by J.K. Rowling, Mary GrandPre (Illustrator)",
    },
  ],
};
export default data;
