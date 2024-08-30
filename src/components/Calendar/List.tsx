'use client'
import * as React from 'react'
import { formatDate } from '@/hooks/useCalendar'
import { getDotColor } from './style'
import { ProjectInfo, ScheduleInfo } from '@/api'
import { format } from 'date-fns'

interface ListProps {
  schedules: ScheduleInfo[] | undefined
  projects: ProjectInfo[] | undefined
}

export function List({ schedules, projects }: ListProps) {
  const groupedSchedules: Record<string, ScheduleInfo[]> = {}
  const today = format(new Date(), 'yyyy-MM-dd')

  if (schedules) {
    schedules.forEach((schedule) => {
      const dateKey = format(new Date(schedule.startDate), 'yyyy-MM-dd')
      if (!groupedSchedules[dateKey]) {
        groupedSchedules[dateKey] = []
      }
      groupedSchedules[dateKey].push(schedule)
    })
  }

  const formatTime = (start: string, end?: string): string => {
    const formatSingleTime = (
      time: string,
    ): { period: string; hour12: number } => {
      const [datePart, timePart] = time.split(' ')
      if (!timePart) return { period: '', hour12: 0 }

      const [hourString] = timePart.split(':')
      const hour = parseInt(hourString)

      if (isNaN(hour)) return { period: '', hour12: 0 }

      const period = hour < 12 ? '오전' : '오후'
      const hour12 = hour % 12 || 12
      return { period, hour12 }
    }

    const { period: startPeriod, hour12: startHour12 } = formatSingleTime(start)
    const { period: endPeriod, hour12: endHour12 } = end
      ? formatSingleTime(end)
      : { period: '', hour12: 0 }

    if (!end || start === end) {
      return '하루 종일'
    }

    const endTime =
      endPeriod === startPeriod
        ? `${endHour12}시`
        : `${endPeriod} ${endHour12}시`

    return `${startPeriod} ${startHour12}시 ~ ${endTime}`
  }

  const getProjectColor = (projectId: string) => {
    return (
      projects?.find((project) => project.id === projectId)?.color || '#ccc'
    )
  }

  return (
    <div className="flex h-full w-[864px] flex-shrink-0 flex-col items-start gap-[10px] p-4">
      <div className="h-[1px] w-[832px] bg-gray-300" />
      <div className="w-full">
        {Object.entries(groupedSchedules).map(([key, schedules]) => {
          const [year, month, date] = key.split('-')
          const isToday = key === today
          return (
            <div
              key={key}
              className="flex gap-[10px] self-stretch border-b border-slate-300 p-[10px]"
            >
              <div className="flex w-[150px] items-center gap-5 px-4 py-1">
                <div
                  className={`${isToday ? 'flex h-9 items-center justify-center rounded-full bg-black text-white' : ''}`}
                >
                  <p className="w-9 text-center text-lead">
                    {formatDate(Number(date))}
                  </p>
                </div>
                <p className="w-opacity-40 py-1 text-detail">{`${month}월 ${date}일`}</p>
              </div>

              <div className="flex flex-1 flex-col items-start justify-center gap-[10px] py-1">
                {schedules.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex w-full items-center gap-9 pl-1"
                  >
                    <div className="flex items-center gap-2 self-stretch">
                      <div
                        className={`h-2 w-2 rounded-full ${getDotColor(getProjectColor(schedule.projectId ?? ''))}`}
                      />
                      <p className="display-webkit-box webkit-box-orient-vertical webkit-line-clamp-2 w-[130px] text-body">
                        {formatTime(schedule.startDate, schedule.endDate)}
                      </p>
                    </div>
                    <p className="display-webkit-box webkit-box-orient-vertical webkit-line-clamp-1 flex-[1_0_0]">
                      {schedule.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
