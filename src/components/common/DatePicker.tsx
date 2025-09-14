'use client';

import { useState, useEffect, forwardRef, useRef } from 'react';
import { ko } from 'date-fns/locale';
import { format, addMonths, subMonths, addYears, subYears, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, getDay, addDays } from 'date-fns';
import colors from '@/theme/colors';

interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date) => void;
    className?: string;
    maxDate?: Date;
    minDate?: Date;
    showWeekdays?: boolean;
    showOutsideDays?: boolean;
    dateFormat?: string;
    disabled?: boolean;
    placeholder?: string;
    showYearNavigation?: boolean;
    yearNavigationRange?: number;
    showMonthNavigation?: boolean;
    highlightToday?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = 일요일, 1 = 월요일, ...
}

// 요일 이름 배열
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function DatePicker({
                                       selected,
                                       onChange,
                                       className = '',
                                       maxDate,
                                       minDate,
                                       showWeekdays = true,
                                       showOutsideDays = true,
                                       dateFormat = 'yyyy년 MM월 dd일',
                                       disabled = false,
                                       placeholder = '날짜 선택',
                                       showYearNavigation = true,
                                       yearNavigationRange = 5,
                                       showMonthNavigation = true,
                                       highlightToday = true,
                                       weekStartsOn = 0,
                                   }: DatePickerProps) {
    // 상태 관리
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(selected || new Date());
    const [displayValue, setDisplayValue] = useState('');
    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    // 선택된 날짜가 변경되면 표시 값도 업데이트
    useEffect(() => {
        if (selected) {
            setDisplayValue(format(selected, dateFormat, { locale: ko }));
            setCurrentMonth(selected);
        } else {
            setDisplayValue('');
        }
    }, [selected, dateFormat]);

    // 달력 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                calendarRef.current &&
                inputRef.current &&
                !calendarRef.current.contains(e.target as Node) &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 달력 열기/닫기 토글
    const toggleCalendar = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    // 날짜 선택 핸들러
    const handleSelectDate = (date: Date) => {
        // 최소/최대 날짜 검증
        if (
            (minDate && date < minDate) ||
            (maxDate && date > maxDate)
        ) {
            return;
        }

        onChange(date);
        setIsOpen(false);
    };

    // 오늘 날짜 선택 핸들러
    const handleSelectToday = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 날짜 검증을 위한 복사본 생성
        if (minDate) {
            const minDateCopy = new Date(minDate);
            minDateCopy.setHours(0, 0, 0, 0);
            if (today < minDateCopy) {
                console.warn('Today is before the minimum allowed date');
                return;
            }
        }

        if (maxDate) {
            const maxDateCopy = new Date(maxDate);
            maxDateCopy.setHours(0, 0, 0, 0);
            if (today > maxDateCopy) {
                console.warn('Today is after the maximum allowed date');
                return;
            }
        }

        // 새로운 Date 객체 생성하여 전달
        onChange(new Date());
        setCurrentMonth(new Date());
        setIsOpen(false);
    };

    // 이전 달로 이동
    const goToPreviousMonth = () => {
        setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
    };

    // 다음 달로 이동
    const goToNextMonth = () => {
        setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
    };

    // 이전 년도로 이동
    const goToPreviousYear = () => {
        setCurrentMonth(prevYear => subYears(prevYear, 1));
    };

    // 다음 년도로 이동
    const goToNextYear = () => {
        setCurrentMonth(prevYear => addYears(prevYear, 1));
    };

    // 월 변경 핸들러
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value, 10);
        const newDate = new Date(currentMonth);
        newDate.setMonth(newMonth);
        setCurrentMonth(newDate);
    };

    // 년도 변경 핸들러
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        const newDate = new Date(currentMonth);
        newDate.setFullYear(newYear);
        setCurrentMonth(newDate);
    };

    // 달력 날짜 생성
    const generateCalendarDays = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = monthStart;
        const endDate = monthEnd;

        // 해당 월의 모든 날짜
        const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

        // 첫 주의 시작 날짜 (이전 달의 날짜 포함)
        const firstDayOfMonth = getDay(monthStart);
        const prevDays = Array.from({ length: (firstDayOfMonth - weekStartsOn + 7) % 7 }, (_, i) => {
            return addDays(monthStart, -(i + 1));
        }).reverse();

        // 마지막 주의 끝 날짜 (다음 달의 날짜 포함)
        const lastDayOfMonth = getDay(monthEnd);
        const nextDays = Array.from({ length: (6 - lastDayOfMonth + weekStartsOn) % 7 }, (_, i) => {
            return addDays(monthEnd, i + 1);
        });

        return [...prevDays, ...daysInMonth, ...nextDays];
    };

    // 년도 옵션 생성
    const generateYearOptions = () => {
        const currentYear = currentMonth.getFullYear();
        const startYear = currentYear - yearNavigationRange;
        const endYear = currentYear + yearNavigationRange;

        return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    };

    // 날짜 셀 렌더링
    const renderDateCell = (date: Date) => {
        const isCurrentMonth = isSameMonth(date, currentMonth);
        const isSelectedDate = selected && isSameDay(date, selected);
        const isTodayDate = isToday(date);
        const isDisabledDate =
            (minDate && date < minDate) ||
            (maxDate && date > maxDate);
        return (
            <button
                key={date.toString()}
                onClick={() => !isDisabledDate && handleSelectDate(date)}
                disabled={isDisabledDate}
                className={`
          w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors
          ${!isCurrentMonth && !showOutsideDays ? 'invisible' : ''}
          ${!isCurrentMonth && showOutsideDays ? 'text-gray-500' : 'text-white'}
          ${isSelectedDate ? 'bg-primary-500 text-white' : ''}
          ${isTodayDate && highlightToday && !isSelectedDate ? 'bg-primary-500/20 font-bold' : ''}
          ${isDisabledDate ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary-500/30 cursor-pointer'}
        `}
            >
                {date.getDate()}
            </button>
        );
    };

    // 달력 그리드 생성
    const calendarDays = generateCalendarDays();
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7));
    }

    // 요일 헤더 렌더링
    const renderWeekdayHeaders = () => {
        const orderedWeekdays = [...WEEKDAYS.slice(weekStartsOn), ...WEEKDAYS.slice(0, weekStartsOn)];

        return (
            <div className="grid grid-cols-7 mb-1">
                {orderedWeekdays.map((day, index) => (
                    <div key={index} className="text-center text-xs text-gray-400 py-2">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    // 오늘 버튼이 비활성화되어야 하는지 확인
    // 현재 날짜가 minDate보다 작거나 maxDate보다 크면 비활성화
    const today = new Date();
    const isTodayDisabled = (() => {
        if (!minDate && !maxDate) return false;

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        if (minDate) {
            const minDateStart = new Date(minDate);
            minDateStart.setHours(0, 0, 0, 0);
            if (todayStart < minDateStart) return true;
        }

        if (maxDate) {
            const maxDateStart = new Date(maxDate);
            maxDateStart.setHours(0, 0, 0, 0);
            if (todayStart > maxDateStart) return true;
        }

        return false;
    })();

    return (
        <div className="custom-datepicker relative">
            {/* 입력 필드 */}
            <div
                ref={inputRef}
                onClick={toggleCalendar}
                className={`relative flex items-center backdrop-blur-sm text-white hover:bg-gray-600/20 rounded-lg p-3 cursor-pointer transition-all 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            >
                <span className="flex-grow font-semibold text-xl">{displayValue || placeholder}</span>
            </div>

            {/* 달력 팝업 */}
            {isOpen && (
                <div
                    ref={calendarRef}
                    className="absolute z-[9999] mt-2 p-4 bg-black/90 border border-gray-700/60 rounded-xl shadow-xl animate-fadeIn"
                    style={{ minWidth: '320px' }}
                >
                    {/* 달력 헤더 */}
                    <div className="flex items-center justify-between mb-4">
                        {/* 년도/월 선택 */}
                        <div className="flex space-x-2">
                            {showYearNavigation && (
                                <select
                                    value={currentMonth.getFullYear()}
                                    onChange={handleYearChange}
                                    className="bg-black/90 text-white rounded-md px-2 py-1 text-sm hover:bg-gray-600/40 focus:outline-none focus:bg-gray-600/40"
                                >
                                    {generateYearOptions().map(year => (
                                        <option key={year} value={year}>{year}년</option>
                                    ))}
                                </select>
                            )}

                            {showMonthNavigation && (
                                <select
                                    value={currentMonth.getMonth()}
                                    onChange={handleMonthChange}
                                    className="bg-black/90 text-white rounded-md px-2 py-1 text-sm hover:bg-gray-600/40 focus:outline-none focus:bg-gray-600/40"
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i}>{i + 1}월</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* 이전/다음 버튼 */}
                        <div className="flex space-x-1">
                            {showYearNavigation && (
                                <button
                                    onClick={goToPreviousYear}
                                    className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                                    aria-label="이전 년도"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                                    </svg>
                                </button>
                            )}

                            {showMonthNavigation && (
                                <button
                                    onClick={goToPreviousMonth}
                                    className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                                    aria-label="이전 달"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                            )}

                            {showMonthNavigation && (
                                <button
                                    onClick={goToNextMonth}
                                    className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                                    aria-label="다음 달"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            )}

                            {showYearNavigation && (
                                <button
                                    onClick={goToNextYear}
                                    className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                                    aria-label="다음 년도"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 요일 헤더 */}
                    {showWeekdays && renderWeekdayHeaders()}

                    {/* 달력 그리드 */}
                    <div className="calendar-grid">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="grid grid-cols-7 mb-1">
                                {week.map(day => renderDateCell(day))}
                            </div>
                        ))}
                    </div>

                    {/* 오늘 버튼 */}
                    <div className="mt-3 flex justify-center">
                        <button
                            type="button"
                            onClick={handleSelectToday}
                            disabled={isTodayDisabled}
                            className={`text-xs py-2 px-4 rounded transition-colors
                            ${isTodayDisabled
                                ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed'
                                : 'bg-primary-500/10 text-primary-400 hover:text-primary-300 hover:bg-primary-500/20'
                            }`}
                        >
                            오늘
                        </button>
                    </div>
                </div>
            )}

            {/* 스타일 */}
            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
