import bcrypt from 'bcrypt';
import debug from 'debug';
import db from './config/mongoose.js';
const populateDebugger = debug('basic-blog:populate');

// import models
import User from './models/user.js';
import Comment from './models/comment.js';
import Post from './models/post.js';

const users = [];
const posts = [];
const comments = [];

main().catch((err) => populateDebugger(err));

async function main() {
  await clearDb();
  await createUsers();
  await createPosts();
  await createComments();

  populateDebugger('closing connection');
  await db.close();
  populateDebugger('connection closed');
}

async function clearDb() {
  // drop all collections to clear db for fresh population
  const collections = await db.listCollections();

  await Promise.all(
    collections.map((c) =>
      (async () => {
        await db.dropCollection(c.name);
        populateDebugger(`${c.name} collections dropped`);
      })()
    )
  );
}

async function userCreate(user, idx) {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = new User({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    handle: user.handle,
    password: hashedPassword,
  });

  await newUser.save();
  users[idx] = newUser;
  populateDebugger(`Added User: ${user.firstname} ${user.lastname}`);
}

async function createUsers() {
  populateDebugger('Adding Users');
  const mockUsers = [
    {
      firstname: 'A',
      lastname: 'B',
      email: 'ab@ab.com',
      handle: 'ab',
      password: '123',
    },
    {
      firstname: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@example.com',
      handle: 'alicej',
      password: 'password123',
    },
    {
      firstname: 'Bob',
      lastname: 'Smith',
      email: 'bob.smith@example.com',
      handle: 'bobsmith',
      password: 'securepass789',
    },
    {
      firstname: 'Charlie',
      lastname: 'Brown',
      email: 'charlie.brown@example.com',
      handle: 'charlieb',
      password: 'letmein456',
    },
  ];

  await Promise.all(mockUsers.map((mu, i) => userCreate(mu, i)));
}

async function postCreate(post, idx) {
  const newPost = new Post({
    author: post.author,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    editedAt: post.editedAt,
    published: post.published,
  });

  await newPost.save();
  posts[idx] = newPost;
  populateDebugger(`Added Post: ${newPost.title}`);
}

async function createPosts() {
  populateDebugger('Adding Posts');
  const mockPosts = [
    {
      author: users[0],
      title: 'The Art of Programming',
      content:
        'Programming is both an art and a science. It requires creativity and logical thinking to craft elegant solutions to complex problems.',
      createdAt: '2023-01-01T00:00:00.000Z',
      editedAt: '2023-01-01T01:30:00.000Z',
    },
    {
      author: users[0],
      title: 'Exploring the Universe',
      content:
        "The universe is vast and full of wonders waiting to be discovered. From distant galaxies to the mysteries of dark matter, there's always something new to learn.",
      createdAt: '2024-02-15T08:45:00.000Z',
      editedAt: '2024-02-15T10:20:00.000Z',
      published: false,
    },
    {
      author: users[2],
      title: 'The Power of Positive Thinking',
      content:
        'Positive thinking can transform your life. By focusing on the good and maintaining a hopeful outlook, you can overcome obstacles and achieve your goals.',
      createdAt: '2023-04-03T14:20:00.000Z',
      editedAt: '2023-04-04T09:10:00.000Z',
    },
    {
      author: users[1],
      title: 'The Joy of Cooking',
      content:
        "Cooking is more than just a necessity; it's a form of self-expression and a way to bring people together. Whether you're baking a cake or grilling burgers, there's joy to be found in the kitchen.",
      createdAt: '2023-06-10T05:30:00.000Z',
      editedAt: '2023-06-10T07:15:00.000Z',
      published: false,
    },
    {
      author: users[2],
      title: 'The Importance of Exercise',
      content:
        'Regular exercise is essential for both physical and mental well-being. From improving cardiovascular health to reducing stress, the benefits of staying active are undeniable.',
      createdAt: '2023-08-22T12:00:00.000Z',
      editedAt: '2023-08-23T03:45:00.000Z',
    },
    {
      author: users[3],
      title: 'The Beauty of Nature',
      content:
        "Nature has a way of inspiring awe and wonder. Whether it's a breathtaking sunset or a serene forest, spending time in nature can rejuvenate the soul and remind us of the wonders of the world.",
      createdAt: '2023-10-05T18:20:00.000Z',
      editedAt: '2023-10-05T22:00:00.000Z',
    },
  ];

  await Promise.all(mockPosts.map((mp, i) => postCreate(mp, i)));
}

async function commentCreate(comment) {
  const newComment = new Comment({
    post: comment.post,
    author: comment.author,
    content: comment.content,
    createdAt: comment.createdAt,
    editedAt: comment.editedAt,
  });

  await newComment.save();
  populateDebugger(`Added Comment: ${newComment.content}`);
}

async function createComments() {
  populateDebugger('Adding Comments');
  const mockComments = [
    {
      post: posts[0],
      author: 'Alice Johnson',
      content: 'Great post!',
      createdAt: '2024-02-04T10:15:00.000Z',
      editedAt: '2024-02-04T10:30:00.000Z',
    },
    {
      post: posts[1],
      author: 'Bob Smith',
      content: 'Interesting insights.',
      createdAt: '2024-02-04T11:20:00.000Z',
      editedAt: '2024-02-04T11:45:00.000Z',
    },
    {
      post: posts[4],
      author: 'Charlie Brown',
      content: 'Thanks for sharing!',
      createdAt: '2024-02-04T12:30:00.000Z',
      editedAt: '2024-02-04T12:45:00.000Z',
    },
    {
      post: posts[3],
      author: 'David Lee',
      content: 'I enjoyed reading this.',
      createdAt: '2024-02-04T13:40:00.000Z',
      editedAt: '2024-02-04T13:55:00.000Z',
    },
    {
      post: posts[3],
      author: 'Emma Clark',
      content: 'Great job!',
      createdAt: '2024-02-04T14:10:00.000Z',
      editedAt: '2024-02-04T14:25:00.000Z',
    },
    {
      post: posts[4],
      author: 'Fiona Davis',
      content: 'Keep up the good work!',
      createdAt: '2024-02-04T15:20:00.000Z',
      editedAt: '2024-02-04T15:35:00.000Z',
    },
    {
      post: posts[0],
      author: 'George Wilson',
      content: 'I agree with your points.',
      createdAt: '2024-02-04T16:40:00.000Z',
      editedAt: '2024-02-04T16:55:00.000Z',
    },
    {
      post: posts[1],
      author: 'Hannah Martinez',
      content: 'Fascinating!',
      createdAt: '2024-02-04T17:50:00.000Z',
      editedAt: '2024-02-04T18:05:00.000Z',
    },
    {
      post: posts[1],
      author: 'Ian Taylor',
      content: 'Well written!',
      createdAt: '2024-02-04T19:00:00.000Z',
      editedAt: '2024-02-04T19:15:00.000Z',
    },
    {
      post: posts[2],
      author: 'Jasmine White',
      content: 'I learned something new.',
      createdAt: '2024-02-04T20:10:00.000Z',
      editedAt: '2024-02-04T20:25:00.000Z',
    },
    {
      post: posts[0],
      author: 'Kevin Harris',
      content: 'Thanks for the insights!',
      createdAt: '2024-02-04T21:30:00.000Z',
      editedAt: '2024-02-04T21:45:00.000Z',
    },
    {
      post: posts[3],
      author: 'Lily Turner',
      content: 'Looking forward to more!',
      createdAt: '2024-02-04T22:40:00.000Z',
      editedAt: '2024-02-04T22:55:00.000Z',
    },
  ];

  await Promise.all(mockComments.map((mc) => commentCreate(mc)));
}
