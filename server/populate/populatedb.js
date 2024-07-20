import bcrypt from 'bcrypt';
import debug from 'debug';
import db from '../config/mongoose.js';
import 'dotenv/config';

const populateDebugger = debug('basic-blog:populate');

// import models
import User from '../models/user.js';
import Comment from '../models/comment.js';
import Post from '../models/post.js';

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
    admin: user.admin,
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
      email: 'a@ab.com',
      handle: 'ab',
      password: process.env.ADMIN_PW,
      admin: true,
    },
    {
      firstname: 'Alice',
      lastname: 'Johnson',
      email: 'alice.johnson@example.com',
      handle: 'alicej',
      password: 'password123',
    },
    {
      firstname: 'Amanda',
      lastname: 'Smith',
      email: 'amanda.smith@example.com',
      handle: 'amandasmith',
      password: 'securepass789',
      admin: true,
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
      title: 'The Amazon Rainforest',
      content:
        "The Amazon Rainforest, spanning across nine countries in South America, is the largest tropical rainforest on Earth and home to an astonishing diversity of flora and fauna. This biodiverse ecosystem plays a vital role in regulating the global climate and is often referred to as the \"lungs of the planet.\" Exploring the Amazon offers a chance to encounter rare species such as jaguars, sloths, and pink river dolphins.\n\nGuided tours lead visitors through dense jungle trails, where they can learn about indigenous cultures and traditional medicinal plants. Sustainable tourism practices are essential to preserving the Amazon's delicate balance and protecting indigenous rights.\n\nThe Amazon River, the second-longest river in the world, flows through the heart of the rainforest, providing essential nutrients and water to countless species of plants and animals. Visitors can explore the river and its tributaries by boat, spotting caimans, river otters, and vibrant bird species along the way. Excursions into remote Amazonian villages offer insights into local customs, folklore, and the daily lives of indigenous communities.\n\nConservation efforts in the Amazon focus on combating deforestation, illegal logging, and habitat destruction. Responsible tourism practices support local communities and contribute to the preservation of the rainforest's biodiversity. By experiencing the Amazon's natural wonders firsthand, visitors gain a deeper appreciation for its ecological importance and the need to protect this irreplaceable natural heritage.",
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
      title: 'The Great Barrier Reef',
      content:
        "The Great Barrier Reef, located off the coast of Queensland, Australia, is the largest coral reef system in the world and a UNESCO World Heritage site. Spanning over 2,300 kilometers, it comprises thousands of individual reefs and islands, home to a dazzling array of marine life. Snorkeling and diving in the Great Barrier Reef offer a chance to encounter vibrant coral gardens, sea turtles, and colorful fish species.\n\nAbove the water, visitors can explore pristine white-sand beaches, lush rainforests, and unique island ecosystems. Conservation efforts are crucial to protecting this natural wonder for future generations to enjoy.\n\nThe Great Barrier Reef supports an incredible diversity of marine species, including over 1,500 species of fish, 411 types of hard coral, and countless other invertebrates. It is also a crucial habitat for endangered species such as the dugong (sea cow) and the green sea turtle. Coral bleaching, caused by rising sea temperatures and climate change, poses a significant threat to the reef's health, highlighting the importance of sustainable tourism practices and conservation initiatives.\n\nVisitors to the Great Barrier Reef can embark on reef cruises, island hopping adventures, and eco-friendly tours that provide insights into the reef's ecology and conservation efforts. Marine biologists and guides offer educational programs to raise awareness about the reef's importance and the challenges it faces. Whether snorkeling in the turquoise waters or relaxing on a secluded beach, the Great Barrier Reef offers a once-in-a-lifetime experience in one of the world's most breathtaking natural environments.",
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
      title: 'The Serengeti National Park',
      content:
        'The Serengeti National Park, located in Tanzania, is one of the most iconic wildlife destinations in the world. Spanning approximately 30,000 square kilometers, it is renowned for its vast savannah plains that stretch as far as the eye can see. The park is best known for hosting the annual Great Migration, where millions of wildebeest, zebras, and other herbivores journey across the plains in search of fresh grazing lands. This natural spectacle is considered one of the Seven Natural Wonders of Africa and is a testament to the resilience and adaptability of wildlife in the face of challenges posed by predators and environmental factors.\n\nIn addition to the Great Migration, the Serengeti is home to a diverse range of wildlife species. Visitors to the park can expect to encounter the "Big Five" – lions, leopards, elephants, buffaloes, and rhinoceroses – along with cheetahs, hyenas, giraffes, and numerous species of antelope. The Serengeti\'s predator population, including large prides of lions and solitary leopards, offers incredible opportunities for wildlife viewing and photography.\n\nBeyond its wildlife, the Serengeti boasts stunning landscapes that vary from open grasslands to acacia woodlands and riverine forests. The Maasai people, who have inhabited the region for centuries, continue to maintain their traditional pastoral lifestyle, coexisting with the wildlife in this unique ecosystem.\n\nVisitors to the Serengeti can explore the park through guided game drives, hot air balloon safaris, and walking safaris accompanied by experienced rangers. Each experience offers a different perspective on the park\'s natural beauty and biodiversity. Accommodation options range from luxury lodges with panoramic views of the savannah to tented camps that provide a closer connection to the sights and sounds of the wilderness.',
      createdAt: '2023-08-22T12:00:00.000Z',
      editedAt: '2023-08-23T03:45:00.000Z',
    },
    {
      author: users[3],
      title: 'Exploring the Enchanting Landscapes of Patagonia',
      content:
        "Patagonia, spanning across southern Argentina and Chile, is a land of raw natural beauty that captivates adventurers and nature enthusiasts alike. This vast region is characterized by its jagged peaks, expansive glaciers, and crystal-clear lakes. Torres del Paine National Park in Chile is a highlight, boasting towering granite spires that pierce the sky and the iconic Cuernos del Paine. Hiking trails like the W Trek offer panoramic views of glaciers and turquoise lakes, making it a paradise for trekking enthusiasts.\n\nIn Argentina, the Perito Moreno Glacier in Los Glaciares National Park is a marvel to behold. This advancing glacier is one of the few in the world that continues to grow, creating a spectacle with its towering ice walls and occasional calving into Lake Argentino. Visitors can take boat tours to witness the glacier up close or trek on the ice itself for a truly immersive experience.\n\nPatagonia's wildlife is equally impressive, with guanacos grazing in the grasslands, condors soaring overhead, and penguins nesting along the coastline. The remote and pristine nature of Patagonia offers a refuge for these and other species, providing ample opportunities for wildlife observation and photography.\n\nBeyond its natural wonders, Patagonia is rich in culture and history. Indigenous communities like the Mapuche in Argentina and the Kawésqar in Chile have inhabited these lands for centuries, maintaining their traditions and connection to the land. Gauchos, the Argentine cowboys, still roam the grasslands, offering a glimpse into traditional Patagonian life.\n\nWhether exploring the windswept plains of the Argentine steppe or kayaking through the fjords of Chilean Patagonia, the region's rugged landscapes and untouched wilderness leave a lasting impression. Patagonia's allure lies in its ability to inspire a sense of awe and adventure, making it a bucket-list destination for travelers seeking a true wilderness experience.",
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
  const post = await Post.findByIdAndUpdate(comment.post, {
    $inc: { commentsCount: 1 },
  });

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
