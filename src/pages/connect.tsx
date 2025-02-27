import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobeAltIcon } from '@heroicons/react/solid';
import Button from '../components/Button';
import Input from '../components/Input';
import { isValid, requestData, invalidInput } from '../utils';
import { codes } from '../constants';
import useConnection from '../hooks/connection';
import useUsers from '../hooks/users';
import RowGroup from '../components/RowGroup';
import WebSocketModal from '../components/WebSocketModal';

/**
 * Setup the request for changing username, which here allow to set your username
 * for the first time.
 */
const requestCHU = (username: string) => requestData(
  codes.request.changeUserName,
  { newUsername: username },
);

const Connect = ({
  connection,
  users,
  reference,
}: {
  connection: ReturnType<typeof useConnection>,
  users: ReturnType<typeof useUsers>,
  reference: any,
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const validAndConnected = () => isValid(username) && connection.isUp;

  /**
   * Send the username to the server and set the username in the app.
   * Handles both click and keyboard inputs.
   */
  const connectionHandler = (event?: any) => {
    if (invalidInput(event) || !validAndConnected()) return;
    connection.send(requestCHU(username));
    users.current.set({ ...users.current.get, name: username });
    navigate('/home');
  };

  return (
    <div className="page" ref={reference}>
      {/* Main content of the page. */}
      <div className="absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col items-center">
        <header className="xl:mb-52 md:mb-32 mb-20">
          <h1 className="text-[6rem] -mb-6 font-black uppercase">Dyonisos</h1>
          <h2 className="text-[2rem] font-semibold">Share cinematic experences.</h2>
        </header>

        <RowGroup>
          <Input id="connect" className="rounded-r-none bg-light-primary-100 focus:bg-light-primary-100" placeholder="Username" value={username} setValue={setUsername} onKeyDown={connectionHandler} />
          <Button className="rounded-l-none" disabled={!validAndConnected()} onClick={connectionHandler}>{connection.isUp ? 'Next' : 'No connection'}</Button>
        </RowGroup>
      </div>

      {/* Top left button to access WebSocket settings. */}
      <Button className="absolute top-0 right-0 w-10 h-10 px-2 rounded-none rounded-bl-lg" onClick={() => connection.modal.toggle()}>
        <GlobeAltIcon />
      </Button>

      {/* Modal to change the WebSocket address. */}
      <WebSocketModal connection={connection} />
    </div>
  );
};

export default Connect;
