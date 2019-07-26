import React from 'react';
import THUMBS_UP from './images/thumbs.up.png';
import THUMBS_DOWN from './images/thumbs.down.png';
import CONFUSED from './images/confused.png';
import EYES from './images/eyes.png';
import HEART from './images/heart.png';
import HOORAY from './images/hooray.jpeg';
import LAUGH from './images/laugh.png';
import ROCKET from './images/rocket.png';

const icons = {
  HEART: {
      "content": "HEART",
      "id": "MDg6UmVhY3Rpb240NzQ3MDU5NQ==",
      "img": HEART,
    },
  THUMBS_UP: {
      "content": "THUMBS_UP",
      "id": "MDg6UmVhY3Rpb240NzQ3MjAxMA==",
      "img": THUMBS_UP ,
    },
  CONFUSED: {
      "content": "CONFUSED",
      "id": "MDg6UmVhY3Rpb240NzQ3MjAxNQ==",
      "img": CONFUSED,
    },
  THUMBS_DOWN: {
      "content": "THUMBS_DOWN",
      "id": "MDg6UmVhY3Rpb240NzQ3MzA1Ng==",
      img: THUMBS_DOWN,
    },
  LAUGH: {
      "content": "LAUGH",
      "id": "MDg6UmVhY3Rpb240NzQ3MzA2MQ==",
      "img": LAUGH,
    },
  HOORAY: {
      "content": "HOORAY",
      "id": "MDg6UmVhY3Rpb240NzQ3MzA2NA==",
    "img": HOORAY,
    },
  ROCKET: {
      "content": "ROCKET",
      "id": "MDg6UmVhY3Rpb240NzQ3MzA2Nw==",
      "img": ROCKET,
    },
  EYES: {
      "content": "EYES",
      "id": "MDg6UmVhY3Rpb240NzQ3MzA2OA==",
      "img": EYES,
    }
  };

export default ({ reaction }) => {
  return (
    <img class="icon" src={icons[reaction.node.content].img} alt="THUMBS_UP" />
  );
};