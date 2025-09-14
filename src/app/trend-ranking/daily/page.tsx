'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker from '@/components/common/DatePicker';
import PlatformSelector from '@/components/trend-ranking/PlatformSelector';
import TrendTable from '@/components/trend-ranking/TrendTable';
import KeywordDetail from '@/components/trend-ranking/KeywordDetail';
import colors from '@/theme/colors';

// 임시 데이터 타입 정의
interface TrendKeyword {
  rank: number;
  keyword: string;
  searchCount: number;
  change: 'up' | 'down' | 'new' | 'same';
  changeValue: number;
}

interface Platform {
  id: string;
  name: string;
  icon: string;
}

export default function DailyTrendRanking() {
  // 상태 관리
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPlatform, setSelectedPlatform] = useState<string>('google');
  const [trendData, setTrendData] = useState<TrendKeyword[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [relatedKeywords, setRelatedKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // 플랫폼 목록 (실제 구현에서는 API에서 가져올 수 있음)
  const platforms: Platform[] = [
    { id: 'google', name: 'Google', icon: '/images/platforms/google.svg' },
    { id: 'youtube', name: 'YouTube', icon: '/images/platforms/youtube.svg' },
    { id: 'twitter', name: 'Twitter', icon: '/images/platforms/twitter.svg' },
    { id: 'naver', name: 'Naver', icon: '/images/platforms/naver.svg' },
    { id: 'reddit', name: 'Reddit', icon: '/images/platforms/reddit.svg' },
    { id: 'instagram', name: 'Instagram', icon: '/images/platforms/instagram.svg' },
  ];

  // 데이터 불러오기 (실제 구현에서는 API 호출)
  useEffect(() => {
    const fetchTrendData = async () => {
      setIsLoading(true);

      // 실제 구현에서는 API 호출
      // const response = await fetch(`/api/trends?date=${format(selectedDate, 'yyyy-MM-dd')}&platform=${selectedPlatform}`);
      // const data = await response.json();

      // 임시 데이터 생성
      const mockData: TrendKeyword[] = Array.from({ length: 50 }, (_, i) => ({
        rank: i + 1,
        keyword: `트렌드 키워드 ${i + 1}`,
        searchCount: Math.floor(Math.random() * 100000) + 5000,
        change: ['up', 'down', 'new', 'same'][Math.floor(Math.random() * 4)] as 'up' | 'down' | 'new' | 'same',
        changeValue: Math.floor(Math.random() * 10) + 1,
      }));

      // 데이터 설정 및 로딩 상태 업데이트
      setTimeout(() => {
        setTrendData(mockData);
        setLastUpdated(format(new Date(), 'yyyy년 MM월 dd일 HH:mm:ss', { locale: ko }));
        setIsLoading(false);
      }, 800);
    };

    fetchTrendData();
  }, [selectedDate, selectedPlatform]);

  // 키워드 선택 시 연관 키워드 불러오기
  useEffect(() => {
    if (!selectedKeyword) {
      setRelatedKeywords([]);
      return;
    }

    // 실제 구현에서는 API 호출
    // const fetchRelatedKeywords = async () => {
    //   const response = await fetch(`/api/keywords/related?keyword=${selectedKeyword}&platform=${selectedPlatform}`);
    //   const data = await response.json();
    //   setRelatedKeywords(data.keywords);
    // };

    // 임시 데이터 생성
    const mockRelatedKeywords = Array.from({ length: 10 }, (_, i) =>
        `${selectedKeyword} 관련 ${i + 1}`
    );

    setRelatedKeywords(mockRelatedKeywords);
  }, [selectedKeyword, selectedPlatform]);

  // 키워드 선택 핸들러
  const handleKeywordSelect = (keyword: string) => {
    setSelectedKeyword(keyword === selectedKeyword ? null : keyword);
  };

  // 날짜 선택 핸들러
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedKeyword(null);
  };

  // 플랫폼 선택 핸들러
  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatform(platformId);
    setSelectedKeyword(null);
  };

  return (
      <div className="min-h-screen bg-radial-gradient text-white">
        <div className="container mx-auto px-4 py-8">
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">일별 트렌드 랭킹</h1>
            <p className="text-gray-300">
              주요 플랫폼의 인기 검색어와 트렌드를 매일 업데이트하여 제공합니다.
            </p>
          </div>

          {/* 날짜 섹션 */}
          <div className="mb-6 text-white w-full flex flex-col items-center justify-center">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                maxDate={new Date()}
                className="w-full md:w-auto"
                showWeekdays={true}
                showOutsideDays={true}
                highlightToday={true}
                placeholder="날짜를 선택하세요"
                dateFormat="yyyy년 MM월 dd일"
            />
          </div>

          {/* 필터 섹션 */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl pt-4 pb-6 pr-6 pl-6 mb-4">
            <div className="flex-grow">
              <label className="block text-sm font-semibold mb-4 text-gray-300">플랫폼</label>
              <PlatformSelector
                  platforms={platforms}
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={handlePlatformChange}
              />
            </div>
          </div>

          {/* 트렌드 테이블 */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-3 h-3 bg-primary-400 rounded-full mr-2"></span>
              인기 검색어 TOP 50
            </h2>

            <TrendTable
                data={trendData}
                isLoading={isLoading}
                selectedKeyword={selectedKeyword}
                onKeywordSelect={handleKeywordSelect}
            />

            {/* 선택된 키워드 상세 정보 */}
            {selectedKeyword && (
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <KeywordDetail
                      keyword={selectedKeyword}
                      relatedKeywords={relatedKeywords}
                      platform={platforms.find(p => p.id === selectedPlatform)?.name || ''}
                  />
                </div>
            )}

            {/* 데이터 수집 정보 */}
            <div className="mt-6 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-start md:items-center">
              <p>마지막 데이터 수집: {lastUpdated}</p>
              <p>출처: {platforms.find(p => p.id === selectedPlatform)?.name || ''} 트렌드 데이터</p>
            </div>
          </div>
        </div>
      </div>
  );
}