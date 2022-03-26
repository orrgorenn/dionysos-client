import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { codes } from '../constants';
import {
  isValid, requestData, testActiveElementById,
} from '../utils';
import {
  Room, SendFunction, SetRoom,
} from '../utils/types';
import Button from './Button';
import LockToggle from './LockToggle';
import Input from './Input';

const newRoom = (
  send: SendFunction,
  room: Room,
  setRoom: SetRoom,
  isPrivate: boolean,
) => {
  setRoom(room);
  send(requestData(
    codes.request.roomCreation,
    { roomname: room.name, isPrivate },
  ));
};

const joinRoom = (
  send: SendFunction,
  roomid: string,
) => {
  send(requestData(
    codes.request.joinRoom,
    { roomid },
  ));
};

const onRoomInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  room: Room,
  setRoom: SetRoom,
) => {
  setRoom({ ...room, name: event.target.value });
};

type RoomInputGroupProps = {
  send: SendFunction,
  room: Room,
  setRoom: SetRoom,
  className: string,
  help: boolean,
  setHelp: React.Dispatch<React.SetStateAction<boolean>>,
}

const RoomInputGroup = ({
  send, room, setRoom, className, help, setHelp,
}: RoomInputGroupProps) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [joinInput, setJoinInput] = useState('');
  const [createInput, setCreateInput] = useState('');

  useEffect(() => {
    if (R.length(room.name) <= 0) {
      setJoinInput('');
      setCreateInput('');
    }
  }, [room]);

  const handleClick = () => setIsPrivate(!isPrivate);
  const handleKeyPress = (event: any) => {
    if (event.code === 'Enter') setIsPrivate(!isPrivate);
  };

  const joinRoomHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (R.isNil(event.target.parentElement)) return;
    const inputEl = event.target.parentElement.firstElementChild as HTMLInputElement;
    const roomId = inputEl.value;
    if (R.length(roomId) === 40) {
      joinRoom(send, inputEl.value);
    }
  };

  const newRoomHandler = () => {
    if (R.not(isValid(room.name))) return;
    newRoom(send, room, setRoom, isPrivate);
  };

  const handleKeyPressInput = (id: string, func: any) => (event: any) => {
    if (event.code === 'Enter' && testActiveElementById(id)) {
      func();
    }
  };

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex justify-between items-center -mb-2">
        <h1 className="text-xl font-bold">Join or create a room</h1>
        <button type="button" className="h-8 w-8 p-1 hover:text-accent-400 hover:brightness-[1.2]" title="Need some help ?" onClick={() => setHelp(!help)}>
          <QuestionMarkCircleIcon />
        </button>
      </div>

      <div className="flex space-x-1">
        <Input noHelper id="join" className="rounded-r-none" placeholder="Room ID" onKeyPress={(event: any) => handleKeyPressInput('join', joinRoomHandler(event))} value={joinInput} setValue={setJoinInput} />
        <Button className="rounded-l-none w-24 px-1" text="Join" onClick={(event: React.ChangeEvent<HTMLInputElement>) => joinRoomHandler(event)} disabled={!(R.length(joinInput) === 40)} />
      </div>

      <div className="flex space-x-1">
        <Input id="create" className="rounded-r-none" placeholder="Room name" onKeyPress={handleKeyPressInput('create', newRoomHandler)} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onRoomInputChange(event, room, setRoom)} value={createInput} setValue={setCreateInput} />
        <LockToggle toggle={isPrivate} onClick={handleClick} onKeyPress={handleKeyPress} />
        <Button colorless className="rounded-l-none w-28 px-1" text="Create" onClick={newRoomHandler} disabled={!isValid(createInput)} />
      </div>
    </div>
  );
};

export default RoomInputGroup;
