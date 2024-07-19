import fetch from 'node-fetch';
import { readFile } from 'node:fs/promises';
import 'dotenv/config';

main();

var token = '';

async function postFetch(url, body, withAuth = true) {
  const headers = withAuth
    ? {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    : {
        'Content-Type': 'application/json',
      };

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

async function getFetch(url, withAuth = true) {
  const headers = withAuth
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  return fetch(url, {
    headers,
  }).then((res) => res.json());
}

async function putImageFetch(url, imagePath, withAuth = true) {
  const headers = withAuth
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  const body = new FormData();
  const blob = new Blob([await readFile(imagePath)]);
  body.set('image', blob, imagePath);
  body.set('admin', true);
  return fetch(url, {
    method: 'PUT',
    headers,
    body,
  }).then((res) => res.json());
}

async function main() {
  token = await login();
  const posts = await getPostList();
  const users = await getUserList();
  const postsImagesPairs = getPostPairs(posts);
  const usersImagesPairs = getUserPairs(users);
  await uploadPostImages(postsImagesPairs);
  await uploadUserImages(usersImagesPairs);
}

async function login() {
  const loginCreds = {
    email: 'a@ab.com',
    password: process.env.ADMIN_PW,
  };

  return postFetch('http://localhost:3000/auth', loginCreds).then(
    (data) => data.token
  );
}

async function getPostList() {
  return getFetch('http://localhost:3000/posts').then((data) => data.posts);
}

async function getUserList() {
  return getFetch('http://localhost:3000/users').then((data) => data.users);
}

function uploadPostImages(postsImagesPairs) {
  return Promise.all(
    postsImagesPairs.map((p) =>
      putImageFetch(
        `http://localhost:3000/posts/${p[0]}`,
        `./populateImages/places/${p[1]}`
      )
    )
  );
}

function uploadUserImages(usersImagesPairs) {
  return Promise.all(
    usersImagesPairs.map((p) =>
      putImageFetch(
        `http://localhost:3000/users/${p[0]}`,
        `./populateImages/faces/${p[1]}`
      )
    )
  );
}

function getPostPairs(posts) {
  return posts
    .filter((p) => p.published)
    .map((p) => {
      let imagePath = '';
      if (p.title === 'Exploring the Enchanting Landscapes of Patagonia') {
        imagePath = 'place_3.jpg';
      } else if (p.title === 'The Great Barrier Reef') {
        imagePath = 'place_4.jpg';
      } else if (p.title === 'The Serengeti National Park') {
        imagePath = 'place_1.jpg';
      } else if (p.title === 'The Amazon Rainforest') {
        imagePath = 'place_2.jpg';
      }

      return [p._id, imagePath];
    });
}

function getUserPairs(users) {
  return users.map((u) => {
    let imagePath = '';
    if (u.handle === 'amandasmith') {
      imagePath = 'face_2.jpeg';
    } else if (u.handle === 'ab') {
      imagePath = 'face_4.jpeg';
    } else if (u.handle === 'alicej') {
      imagePath = 'face_1.jpeg';
    } else if (u.handle === 'charlieb') {
      imagePath = 'face_3.jpeg';
    }

    return [u._id, imagePath];
  });
}
