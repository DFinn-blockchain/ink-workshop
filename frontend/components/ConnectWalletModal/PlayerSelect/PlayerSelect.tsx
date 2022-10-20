import { Listbox, Transition } from '@headlessui/react';
import { usePlayerScores } from '../../../hooks/useGameContract';
import { useUI } from '../../../contexts/UIContext';
import { RiArrowDownLine, RiArrowDownSFill, RiCheckFill, RiCheckLine } from 'react-icons/ri';
import { Fragment } from 'react';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const PlayerSelect: React.FC<Props> = ({ className }) => {
  const players = usePlayerScores();
  const { player, setPlayer } = useUI();

  return (
    <div className={classNames('', className)}>
      <Listbox value={player} onChange={setPlayer}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full flex items-center hover:cursor-pointer cursor-default rounded-lg text-brand-600 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm">
            <span className="block truncate">{player ? player : 'Select a player'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <RiArrowDownSFill className="h-5 w-5 text-brand-600/70" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            {players.length === 0 ? (
              <p className="mt-3 text-md text-white/70">Loading...</p>
            ) : (
              <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {players.map((player, playerIndex) => (
                  <Listbox.Option
                    key={player.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 transition duration-75 text-brand-600 ${
                        active && 'bg-players-4/30'
                      } hover:cursor-pointer`
                    }
                    value={player.id}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {player.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <RiCheckFill className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
