'use client'

import { useState } from 'react'
import {
  useNotificationListQuery,
  useNotificationPost,
} from '@/api/services/notification/quries'

import { useOneProjectInfoQuery } from '@/api/services/project/quries'
import {
  Notification,
  NotificationType,
} from '@/api/services/notification/model'
import { ProjectInfo, ProjectInviteStatus } from '@/api'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useQueryClient } from '@tanstack/react-query'
import { ProfileAvatar } from '../Avatar/Avatar'

const ProjectInviteModal: React.FC<{
  onClose: () => void
  notification: Notification
}> = ({ onClose, notification }) => {
  const queryClient = useQueryClient()
  const projectResponse = useOneProjectInfoQuery(notification.originId)
  const project = projectResponse.data?.result || null

  const notificationPost = useNotificationPost(notification.id, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificationList'] })
      queryClient.invalidateQueries({ queryKey: ['projectList'] })
    },
  })

  const clickHandler = (select: boolean) => {
    notificationPost.mutate({
      read: true,
      choice: select ? ProjectInviteStatus.Acceped : ProjectInviteStatus.Denied,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-full max-w-md flex-col gap-[24px] rounded-lg bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">프로젝트 초대 알림</div>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18"
                stroke="#374151"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <p className="font-pretendard text-sm font-semibold leading-[1.42857] text-black">
          {notification.title}
        </p>
        <div className="flex font-pretendard text-sm font-medium leading-[1.71429] text-black">
          <div className="w-[100px]">프로젝트 제목:</div>
          <span className="font-pretendard text-sm font-normal leading-[1.71429] text-black">
            {project?.title}
          </span>
        </div>
        <div className="flex font-pretendard text-sm font-medium leading-[1.71429] text-black">
          <div className="w-[100px]">프로젝트 기간:</div>
          <span className="font-pretendard text-sm font-normal leading-[1.71429] text-black">
            {project?.startDate && project?.endDate ? (
              <>
                {format(project.startDate, 'yy.MM.dd (EEE)', { locale: ko })} ~
                {format(project.endDate, 'yy.MM.dd (EEE)', { locale: ko })}
              </>
            ) : (
              <div />
            )}
          </span>
        </div>
        <div className="flex font-pretendard text-sm font-medium leading-[1.71429] text-black">
          <div className="h-full w-[100px]">프로젝트 개요:</div>
          <span className="w-[268px] font-pretendard text-sm font-normal leading-[1.71429] text-black">
            {project?.overview}
          </span>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => clickHandler(false)}
            className="mr-2 w-1/2 rounded-lg border border-red-200 bg-red-100 py-2 text-sm text-red-500"
          >
            거절
          </button>
          <button
            onClick={() => clickHandler(true)}
            className="w-1/2 rounded-lg bg-blue-500 py-2 text-sm text-white"
          >
            참가
          </button>
        </div>
      </div>
    </div>
  )
}

const MeetingReminderModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[448px] flex-col gap-[24px] rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">아침 긴급 회의</h2>
          <button onClick={onClose}>
            <div className="flex gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 2L22 6"
                  stroke="#374151"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 20.5L19 9L15 5L3.5 16.5L2 22L7.5 20.5Z"
                  stroke="black"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 6H21"
                  stroke="#374151"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6"
                  stroke="black"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6"
                  stroke="black"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 11V17"
                  stroke="black"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 11V17"
                  stroke="black"
                  stroke-width="1.33333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        <p className="font-sans text-base font-normal leading-7 text-black">
          2024. 07. 19(금) 오전 4:00 ~ 오전 8:00
        </p>

        <div className="flex items-center text-sm text-gray-600">
          <div className="flex gap-[8px]">
            <p className="font-sans text-sm font-medium leading-none text-gray-400">
              매주 화, 수, 목
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M11.333 1.33398L13.9997 4.00065L11.333 6.66732"
                stroke="#9CA3AF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 7.33333V6.66667C2 5.95942 2.28095 5.28115 2.78105 4.78105C3.28115 4.28095 3.95942 4 4.66667 4H14"
                stroke="#9CA3AF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.66667 14.6673L2 12.0007L4.66667 9.33398"
                stroke="#9CA3AF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 8.66602V9.33268C14 10.0399 13.719 10.7182 13.219 11.2183C12.7189 11.7184 12.0406 11.9993 11.3333 11.9993H2"
                stroke="#9CA3AF"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.6663 14V12.6667C10.6663 11.9594 10.3854 11.2811 9.88529 10.781C9.3852 10.281 8.70692 10 7.99967 10H3.99967C3.29243 10 2.61415 10.281 2.11406 10.781C1.61396 11.2811 1.33301 11.9594 1.33301 12.6667V14"
                stroke="#374151"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.99967 7.33333C7.47243 7.33333 8.66634 6.13943 8.66634 4.66667C8.66634 3.19391 7.47243 2 5.99967 2C4.52692 2 3.33301 3.19391 3.33301 4.66667C3.33301 6.13943 4.52692 7.33333 5.99967 7.33333Z"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.667 14.0012V12.6679C14.6666 12.077 14.4699 11.5031 14.1079 11.0361C13.7459 10.5691 13.2391 10.2356 12.667 10.0879"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.667 2.08789C11.2406 2.23476 11.749 2.56836 12.1121 3.0361C12.4752 3.50384 12.6722 4.07911 12.6722 4.67122C12.6722 5.26334 12.4752 5.83861 12.1121 6.30635C11.749 6.77409 11.2406 7.10769 10.667 7.25456"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>자기주도 프로젝트</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12.6667 2.66602H3.33333C2.59695 2.66602 2 3.26297 2 3.99935V13.3327C2 14.0691 2.59695 14.666 3.33333 14.666H12.6667C13.403 14.666 14 14.0691 14 13.3327V3.99935C14 3.26297 13.403 2.66602 12.6667 2.66602Z"
                stroke="#374151"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.667 1.33398V4.00065"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.33301 1.33398V4.00065"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 6.66602H14"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>팀 일정</span>
          </div>
        </div>

        <div className="mt-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-[2px] px-[8px] py-[6px]">
                <ProfileAvatar
                  size="32"
                  imageUrl={member.imageUrl}
                  name={member.name}
                />
                <span className="ml-2">{member.name}</span>
              </div>
              <span
                className={`text-sm ${
                  member.id === 1
                    ? 'text-blue-500'
                    : member.id === 2
                      ? 'text-red-500'
                      : 'text-gray-500'
                }`}
              >
                {member.id === 1 ? '참석' : member.id === 2 ? '불참' : '미정'}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-600">
          서버 배포 후 결제 관련 이슈가 발생해 닫아놓은 상태입니다.
        </p>

        <div className="flex justify-around gap-[12px]">
          <button className="w-[120px] rounded bg-red-100 py-2 text-red-500">
            불참
          </button>
          <button className="w-[120px] rounded bg-blue-100 py-2 text-blue-500">
            미정
          </button>
          <button className="w-[120px] rounded bg-blue-500 py-2 text-white">
            참석
          </button>
        </div>
      </div>
    </div>
  )
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showProjectInviteModal, setProjectInviteShowModal] = useState(false)
  const [showMeetingReminderModal, setMeetingReminderShowModal] =
    useState(false)
  const [notification, setNotification] = useState<Notification>()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const notificationResponse = useNotificationListQuery()
  const notificationList = notificationResponse.data?.result || []

  const handleNotificationClick = (notification: Notification) => {
    if (notification.type === NotificationType.ProjectInvite) {
      setNotification(notification)
      setProjectInviteShowModal(true)
    }

    if (notification.type === NotificationType.MeetingReminder) {
      setNotification(notification)
      setMeetingReminderShowModal(true)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center p-2 text-lg font-medium text-gray-700 hover:text-gray-900"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M21 9.33398C21 7.47747 20.2625 5.69699 18.9497 4.38424C17.637 3.07148 15.8565 2.33398 14 2.33398C12.1435 2.33398 10.363 3.07148 9.05025 4.38424C7.7375 5.69699 7 7.47747 7 9.33398C7 17.5007 3.5 19.834 3.5 19.834H24.5C24.5 19.834 21 17.5007 21 9.33398Z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.0181 24.5C15.813 24.8536 15.5186 25.1471 15.1644 25.3511C14.8102 25.5551 14.4086 25.6625 13.9998 25.6625C13.591 25.6625 13.1894 25.5551 12.8352 25.3511C12.481 25.1471 12.1866 24.8536 11.9814 24.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-lg border border-gray-200 bg-white p-[10px] shadow-lg focus:outline-none"
          role="menu"
        >
          <div className="flex items-center justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M12 5.33398C12 4.27312 11.5786 3.2557 10.8284 2.50556C10.0783 1.75541 9.06087 1.33398 8 1.33398C6.93913 1.33398 5.92172 1.75541 5.17157 2.50556C4.42143 3.2557 4 4.27312 4 5.33398C4 10.0007 2 11.334 2 11.334H14C14 11.334 12 10.0007 12 5.33398Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.15335 14C9.03614 14.2021 8.86791 14.3698 8.6655 14.4864C8.46309 14.6029 8.2336 14.6643 8.00001 14.6643C7.76643 14.6643 7.53694 14.6029 7.33453 14.4864C7.13212 14.3698 6.96389 14.2021 6.84668 14"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6.66699 4H14.0003"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66699 8H14.0003"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66699 12H14.0003"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 4.00065L2.66667 4.66732L4 3.33398"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 8.00065L2.66667 8.66732L4 7.33398"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12.0007L2.66667 12.6673L4 11.334"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <ul className="space-y-2 p-4">
            {notificationList.map((notice) => (
              <li
                key={notice.id}
                onClick={() => handleNotificationClick(notice)}
                className="gap-[4px] p-[12px] font-sans text-sm font-normal leading-5 text-slate-500"
              >
                <div className="flex items-center gap-[10px] font-sans text-sm font-medium leading-none text-black">
                  {!notice.read && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                    >
                      <circle cx="4" cy="4" r="4" fill="#EF4444" />
                    </svg>
                  )}
                  <span>알림</span>
                </div>
                {notice.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showProjectInviteModal && (
        <ProjectInviteModal
          onClose={() => setProjectInviteShowModal(false)}
          notification={notification as Notification}
        />
      )}
      {showMeetingReminderModal && (
        <MeetingReminderModal
          onClose={() => setMeetingReminderShowModal(false)}
        />
      )}
    </div>
  )
}

export default NotificationDropdown
