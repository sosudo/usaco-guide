import { Popover, Transition } from '@headlessui/react';
import {
  ChatAlt2Icon,
  ChevronDownIcon,
  SearchIcon,
  TerminalIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import { Link } from 'gatsby';
import * as React from 'react';
import { useContext, useState } from 'react';
import { SECTIONS, SECTION_LABELS } from '../../../content/ordering';
import { SignInContext } from '../../context/SignInContext';
import UserDataContext from '../../context/UserDataContext/UserDataContext';
import { useUserGroups } from '../../hooks/groups/useUserGroups';
import ContactUsSlideover from '../ContactUsSlideover/ContactUsSlideover';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import Logo from '../Logo';
import LogoSquare from '../LogoSquare';
import MobileMenuButtonContainer from '../MobileMenuButtonContainer';
import SectionsDropdown from '../SectionsDropdown';
import { SearchModal } from './SearchModal';
import { UserAvatarMenu } from './UserAvatarMenu';

export default function TopNavigationBar({
  indexPage = false,
  linkLogoToIndex = false,
  currentSection = null,
  hideClassesPromoBar = false,
}) {
  const { firebaseUser, signOut, isLoaded } = useContext(UserDataContext);
  const { signIn } = React.useContext(SignInContext);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isContactUsActive, setIsContactUsActive] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const userGroups = useUserGroups();
  const resources = [
    {
      name: 'USACO Forum',
      description: 'An unofficial Q&A forum for USACO contestants.',
      href: 'https://forum.usaco.guide/',
      icon: ChatAlt2Icon,
    },
    {
      name: 'USACO IDE',
      description:
        'A realtime collaborative online IDE designed for competitive programming and USACO.',
      href: 'https://ide.usaco.guide/',
      icon: TerminalIcon,
    },
  ];
  const mobileLinks = [
    {
      label: 'Dashboard',
      url: '/dashboard/',
    },
    ...SECTIONS.map(section => ({
      label: SECTION_LABELS[section],
      url: `/${section}/`,
    })),
    {
      label: 'Problems',
      url: '/problems/',
    },
    ...(userGroups.data?.length > 0
      ? [
          {
            label: 'Groups',
            url: '/groups',
          },
        ]
      : []),
  ];

  return (
    <>
      {!hideClassesPromoBar && (
        <div className="relative bg-blue-600">
          <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="pr-16 sm:text-center sm:px-16">
              <p className="font-medium text-white">
                <span className="md:hidden">
                  Join the Introduction to USACO Workshop!
                </span>
                <span className="hidden md:inline">
                  Want to learn more about USACO? Join the Introduction to USACO
                  Workshop!
                </span>
                <span className="block sm:ml-2 sm:inline-block">
                  <a
                    href="https://joincpi.org/workshop"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-bold underline"
                  >
                    Learn more &rarr;
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="bg-white dark:bg-gray-900 shadow relative z-10">
        <div
          className={`${
            indexPage
              ? 'max-w-6xl px-2 lg:px-6'
              : 'max-w-7xl px-2 sm:px-4 lg:px-8'
          } mx-auto`}
        >
          <div className="flex justify-between h-16">
            <div className="flex px-2 lg:px-0">
              <Link
                to={linkLogoToIndex ? '/' : '/dashboard'}
                className="flex-shrink-0 flex items-center"
              >
                <div className="block sm:hidden">
                  <LogoSquare className="h-10 w-10" />
                </div>
                <div className={'hidden sm:block h-9'}>
                  <Logo />
                </div>
              </Link>
              <div className={`hidden lg:ml-8 lg:flex space-x-8`}>
                <SectionsDropdown currentSection={currentSection} />
                <Link
                  to="/problems/"
                  getProps={({ isCurrent }) => ({
                    className: isCurrent
                      ? 'inline-flex items-center px-1 pt-0.5 border-b-2 border-blue-500 dark:border-blue-700 text-base font-medium leading-6 text-gray-900 dark:text-dark-high-emphasis focus:outline-none focus:border-blue-700 dark:focus:border-blue-500 transition'
                      : 'inline-flex items-center px-1 pt-0.5 border-b-2 border-transparent text-base font-medium leading-6 text-gray-500 hover:text-gray-900 hover:border-gray-300  focus:outline-none focus:text-gray-900 focus:border-gray-300 dark:text-dark-high-emphasis dark:hover:border-gray-500 dark:focus:border-gray-500 transition',
                  })}
                >
                  Problems
                </Link>
                <Popover.Group as="nav" className="h-full">
                  <Popover className="h-full">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open
                              ? 'text-gray-900'
                              : 'text-gray-500 hover:border-gray-300 focus:border-gray-300 dark:hover:border-gray-500 dark:focus:border-gray-500',
                            'group inline-flex items-center h-full border-b-2 border-transparent space-x-2 text-base leading-6 font-medium hover:text-gray-900 focus:outline-none focus:text-gray-900  transition ease-in-out duration-150 dark:text-dark-high-emphasis'
                          )}
                        >
                          <span className="mt-0.5">Resources</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-gray-500' : 'text-gray-400',
                              'mt-0.5 ml-2 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 dark:text-dark-med-emphasis dark:group-hover:text-dark-med-emphasis dark:group-focus:text-dark-med-emphasis transition ease-in-out duration-150'
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={React.Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="hidden md:block absolute z-20 top-full inset-x-0 transform shadow-lg bg-white dark:bg-gray-900"
                          >
                            <div
                              className={classNames(
                                indexPage
                                  ? 'max-w-6xl px-2 lg:px-6'
                                  : 'max-w-7xl px-2 sm:px-4 lg:px-8',
                                'mx-auto grid gap-y-6 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12'
                              )}
                            >
                              {userGroups.data?.length > 0 && (
                                <Link
                                  to="/groups/"
                                  getProps={({ isCurrent }) => ({
                                    className: isCurrent
                                      ? '-m-3 p-3 flex flex-col justify-between rounded-lg bg-gray-100 dark:bg-gray-700'
                                      : '-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition',
                                  })}
                                >
                                  <div className="flex md:h-full lg:flex-col">
                                    <div className="flex-shrink-0">
                                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white sm:h-12 sm:w-12">
                                        <UserGroupIcon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </div>
                                    <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                      <div>
                                        <p className="text-base font-medium text-gray-900 dark:text-dark-high-emphasis">
                                          Groups
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-dark-med-emphasis">
                                          A Learning Management System fully
                                          integrated with the USACO Guide.
                                        </p>
                                      </div>
                                      <p className="mt-2 text-sm font-medium text-blue-600 lg:mt-4">
                                        Open{' '}
                                        <span aria-hidden="true">&rarr;</span>
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              )}
                              {resources.map(item => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  rel="noreferrer"
                                  target="_blank"
                                  className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                  <div className="flex md:h-full lg:flex-col">
                                    <div className="flex-shrink-0">
                                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white sm:h-12 sm:w-12">
                                        <item.icon
                                          className="h-6 w-6"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </div>
                                    <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                      <div>
                                        <p className="text-base font-medium text-gray-900 dark:text-dark-high-emphasis">
                                          {item.name}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-dark-med-emphasis">
                                          {item.description}
                                        </p>
                                      </div>
                                      <p className="mt-2 text-sm font-medium text-blue-600 lg:mt-4">
                                        Open in new tab{' '}
                                        <span aria-hidden="true">&rarr;</span>
                                      </p>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group>
                <button
                  className="cursor-pointer inline-flex items-center px-1 border-b-2 border-transparent text-base font-medium leading-6 text-gray-500 hover:text-gray-900 hover:border-gray-300 focus:outline-none focus:text-gray-900 focus:border-gray-300 dark:text-dark-high-emphasis dark:hover:border-gray-500 dark:focus:border-gray-500 transition"
                  onClick={() => setIsContactUsActive(true)}
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div
              className={`flex-1 flex items-center justify-end px-2 lg:px-0 lg:ml-6`}
            >
              <button
                type="button"
                className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-gray-500 hover:text-gray-700 dark:text-dark-high-emphasis focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsSearchOpen(true)}
              >
                <SearchIcon
                  className="h-5 w-5 text-gray-400 dark:text-gray-300"
                  aria-hidden="true"
                />

                <span className="ml-2 font-medium">Search</span>
              </button>
            </div>
            <div className="flex items-center lg:hidden">
              {/* Mobile menu button */}
              <MobileMenuButtonContainer
                className="inline-flex items-center justify-center p-2"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                {/* Icon when menu is closed. */}
                {/* Menu open: "hidden", Menu closed: "block" */}
                <svg
                  className={`${isMobileNavOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icon when menu is open. */}
                {/* Menu open: "block", Menu closed: "hidden" */}
                <svg
                  className={`${isMobileNavOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </MobileMenuButtonContainer>
            </div>
            <div className="hidden lg:mx-3 lg:block border-l border-gray-200 dark:border-gray-700 h-6 self-center" />
            <div className="hidden lg:flex lg:items-center">
              {firebaseUser ? (
                <UserAvatarMenu
                  firebaseUser={firebaseUser}
                  onSignOut={() => signOut()}
                />
              ) : !isLoaded ? (
                <div className="p-2.5">
                  <LoadingSpinner className="h-4 w-4" />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => signIn()}
                    className="relative inline-flex items-center px-2 py-1 border border-transparent text-base leading-6 font-medium rounded-md text-gray-500 hover:text-gray-700 dark:text-dark-high-emphasis focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Login
                  </button>

                  {/* Settings button */}
                  <Link
                    to="/settings"
                    className="p-1 border-2 border-transparent text-gray-400 dark:text-dark-med-emphasis rounded-full hover:text-gray-300 dark:hover:text-dark-high-emphasis focus:outline-none focus:text-gray-500 focus:bg-gray-100 dark:focus:bg-gray-700 transition"
                    aria-label="Settings"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/*
        Mobile menu, toggle classes based on menu state.

        Menu open: "block", Menu closed: "hidden"
      */}
        <div className={`${isMobileNavOpen ? 'block' : 'hidden'} lg:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {mobileLinks.map((link, idx) => (
              <Link
                key={link.url}
                to={link.url}
                getProps={({ isCurrent }) => ({
                  className: isCurrent
                    ? 'block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 dark:text-blue-100 bg-blue-50 dark:bg-blue-800 focus:outline-none focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700 transition'
                    : 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition',
                })}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://forum.usaco.guide/"
              target="_blank"
              rel="noreferrer"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
            >
              Forum
            </a>
            <a
              href="https://ide.usaco.guide/"
              target="_blank"
              rel="noreferrer"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
            >
              IDE
            </a>
            <button
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
              onClick={() => setIsContactUsActive(true)}
            >
              Contact Us
            </button>
            <Link
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
              to="/settings"
            >
              Settings
            </Link>
            {firebaseUser ? (
              <button
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-dark-med-emphasis hover:text-gray-800 dark:hover:text-dark-high-emphasis hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 focus:outline-none focus:text-gray-800 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 transition"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <ContactUsSlideover
        isOpen={isContactUsActive}
        onClose={() => setIsContactUsActive(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
