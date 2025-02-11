import React from 'react';
import { visibility } from '../utils';

const Help = ({ visible }: { visible: boolean }) => (
  <div role="tooltip" className={`z-10 absolute right-0 top-3 font-medium bg-light-primary-300/80 dark:bg-dark-primary-600/80 text-light-secondary dark:text-dark-secondary p-3 rounded-r-lg w-[44ch] whitespace-normal translate-x-[100%] ${visibility(visible)}`}>
    <h1 className="font-black text-xl">Basics</h1>
    <p className="font-bold">
      The person owning the film need to create the room
      which will create an ID under the room name.
      This ID is what you share for others to join the room.
    </p>
    <br />
    <h1 className="font-bold text-xl text-light-secondary/90 dark:text-dark-secondary/90">Create a room</h1>
    <p className="text-light-secondary/70 dark:text-dark-secondary/70">
      A room can be public or private,
      shown by the state of the lock when creating a room, open by default.
      If a room is private, you will be prompted for every connection and
      can accept or reject them.
    </p>
    <br />
    <h1 className="font-bold text-xl text-light-secondary/90 dark:text-dark-secondary/90">Join a room</h1>
    <p className="text-light-secondary/70 dark:text-dark-secondary/70">
      Simply put the ID the owner will give you in the input field.
      If the room you try to join is private, just wait until the owner accepts you.
    </p>
  </div>
);

export default Help;
