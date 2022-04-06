/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobeAltIcon } from '@heroicons/react/solid';
import Button from '../components/Button';
import Input from '../components/Input';
import { isValid, requestData, invalidInput } from '../utils';
import { codes } from '../constants';
import ConnectModal from '../components/ConnectModal';
import useModal from '../hooks/modal';
import useConnection from '../hooks/connection';
import useUsers from '../hooks/users';
import useMessages from '../hooks/messages';
import RowGroup from '../components/RowGroup';

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
  messages,
}: {
  connection: ReturnType<typeof useConnection>,
  users: ReturnType<typeof useUsers>,
  messages: ReturnType<typeof useMessages>,
}) => {
  const navigate = useNavigate();
  const modal = useModal();
  const [username, setUsername] = useState('');
  const validAndConnected = () => isValid(username) && connection.isUp;

  /**
   * Send the username to the server and set the username in the app.
   * Handles both click and keyboard inputs.
   */
  const connectionHandler = (event?: any) => {
    if (invalidInput(event) || !validAndConnected()) return;
    connection.send(requestCHU(username));
    users.setCurrent({ ...users.current, name: username });
    navigate('/home');
  };

  return (
    <>
      {/* Main content of the page. */}
      <div className="absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col items-center">
        <header className="xl:mb-52 md:mb-32 mb-20">
          <h1 className="text-[6rem] -mb-6 font-black uppercase">Dyonisos</h1>
          <h2 className="text-[2rem] font-semibold">Share cinematic experences.</h2>
        </header>

        <RowGroup>
          <Input id="connect" className="rounded-r-none" placeholder="Username" value={username} setValue={setUsername} onKeyPress={connectionHandler} />
          <Button className="rounded-l-none" disabled={!validAndConnected()} onClick={connectionHandler}>{connection.isUp ? 'Next' : 'No connection'}</Button>
        </RowGroup>
      </div>

      {/* Top left button to access WebSocket settings. */}
      <Button className="absolute top-0 right-0 w-10 h-10 px-2 rounded-none rounded-bl-lg" onClick={() => modal.toggle()}>
        <GlobeAltIcon />
      </Button>

      {/* Modal with WebSocket settings. */}
      <ConnectModal
        connection={connection}
        modal={modal}
        messages={messages}
      />
    </>
  );
};

export default Connect;
