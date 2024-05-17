const express = require("express");
const sequelize = require("./database");
const Book = require("./models/Book");

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  sequelize
    .sync({ force: true })
    .then(async () => {
      console.log("Database synced");

      const initialBooks = [
        {
          name: "Harry Potter and the Order of the Phoenix",
          img: "https://bit.ly/2IcnSwz",
          summary:
            "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry.",
        },
        {
          name: "The Lord of the Rings: The Fellowship of the Ring",
          img: "https://bit.ly/2tC1Lcg",
          summary:
            "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.",
        },
        {
          name: "Avengers: Endgame",
          img: "https://bit.ly/2Pzczlb",
          summary:
            "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe.",
        },
        {
          name: "The Great Gatsby",
          img: "https://bit.ly/3AfqAhu",
          summary:
            "A novel about the American dream gone awry, as the mysterious millionaire Jay Gatsby pursues wealth, status, and his lost love, Daisy Buchanan, in 1920s Long Island.",
        },
        {
          name: "To Kill a Mockingbird",
          img: "https://bit.ly/3AjWf5n",
          summary:
            "A young girl, Scout, grows up in the racially charged Deep South and learns important life lessons from her father, Atticus Finch, as he defends a black man wrongly accused of raping a white woman.",
        },
        {
          name: "1984",
          img: "https://bit.ly/3AfqAhu",
          summary:
            "A dystopian novel set in a totalitarian society controlled by Big Brother, where independent thinking is suppressed and the truth is manipulated.",
        },
        {
          name: "Moby Dick",
          img: "https://bit.ly/3wF6Dl8",
          summary:
            "The narrative follows the adventures of Ishmael and his voyage on the whaling ship Pequod, commanded by the obsessed Captain Ahab in pursuit of the giant white whale, Moby Dick.",
        },
        {
          name: "Pride and Prejudice",
          img: "https://bit.ly/3AjWf5n",
          summary:
            "The romantic clash between the opinionated Elizabeth Bennet and her proud beau, Mr. Darcy, is set against the backdrop of English society in the early 19th century.",
        },
        {
          name: "The Catcher in the Rye",
          img: "https://bit.ly/3Bkc8By",
          summary:
            "A story about the events occurring around a young boy, Holden Caulfield, who has been expelled from prep school and is wandering New York City, wrestling with his feelings of isolation and rebellion.",
        },
        {
          name: "The Hobbit",
          img: "https://bit.ly/3PjVzhV",
          summary:
            "Bilbo Baggins, a hobbit, embarks on a grand adventure with a group of dwarves to reclaim their homeland from the dragon Smaug.",
        },
      ];

      for (const book of initialBooks) {
        await Book.create(book);
      }
      console.log("Initial data added");
    })
    .catch((err) => {
      console.log("Error syncing database:", err);
    });
});

app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    await book.update(req.body);
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    await book.destroy();
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});
