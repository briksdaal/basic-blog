import fetch from 'node-fetch';
import { readFile } from 'node:fs/promises';
import 'dotenv/config';

main();

var token = '';

var api_url;

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

async function putImageFetch(url, imagePath, admin = false, withAuth = true) {
  const headers = withAuth
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  const body = new FormData();
  const blob = new Blob([await readFile(imagePath)]);
  body.set('image', blob, imagePath);
  body.set('admin', admin);
  return fetch(url, {
    method: 'PUT',
    headers,
    body,
  }).then((res) => res.json());
}

async function main() {
  api_url =
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:3000/'
      : process.env.API_URL;
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

  return postFetch(`${api_url}auth`, loginCreds).then((data) => data.token);
}

async function getPostList() {
  return getFetch(`${api_url}posts`).then((data) => data.posts);
}

async function getUserList() {
  return getFetch(`${api_url}users`).then((data) => data.users);
}

function uploadPostImages(postsImagesPairs) {
  return Promise.all(
    postsImagesPairs.map((p) =>
      putImageFetch(
        `${api_url}posts/${p[0]}`,
        `./populate/populateImages/places/${p[1]}`
      )
    )
  );
}

function uploadUserImages(usersImagesPairs) {
  return Promise.all(
    usersImagesPairs.map((p) =>
      putImageFetch(
        `${api_url}users/${p[0]}`,
        `./populate/populateImages/faces/${p[1]}`,
        p[2]
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
    let admin = '';
    if (u.handle === 'amandasmith') {
      imagePath = 'face_2.jpeg';
      admin = true;
    } else if (u.handle === 'ab') {
      imagePath = 'face_4.jpeg';
      admin = true;
    } else if (u.handle === 'alicej') {
      imagePath = 'face_1.jpeg';
      admin = false;
    } else if (u.handle === 'charlieb') {
      imagePath = 'face_3.jpeg';
      admin = false;
    }

    return [u._id, imagePath, admin];
  });
}
