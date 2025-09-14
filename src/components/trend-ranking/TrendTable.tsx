'use client';

import { useMemo } from 'react';

interface TrendKeyword {
  rank: number;
  keyword: string;
  searchCount: number;
  change: 'up' | 'down' | 'new' | 'same';
  changeValue: number;
}

interface TrendTableProps {
  data: TrendKeyword[];
  isLoading: boolean;
  selectedKeyword: string | null;
  onKeywordSelect: (keyword: string) => void;
}

export default function TrendTable({
  data,
  isLoading,
  selectedKeyword,
  onKeywordSelect
}: TrendTableProps) {
  // 검색 횟수 포맷팅
  const formatSearchCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // 변화 화살표 렌더링
  const renderChangeIndicator = (change: TrendKeyword['change'], value: number) => {
    switch (change) {
      case 'up':
        return (
          <span className="flex items-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <span className="ml-1">{value}</span>
          </span>
        );
      case 'down':
        return (
          <span className="flex items-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            <span className="ml-1">{value}</span>
          </span>
        );
      case 'new':
        return (
          <span className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded-full">NEW</span>
        );
      default:
        return (
          <span className="text-gray-400">-</span>
        );
    }
  };

  // 데이터를 두 열로 분할
  const { leftColumn, rightColumn } = useMemo(() => {
    const half = Math.ceil(data.length / 2);
    return {
      leftColumn: data.slice(0, half),
      rightColumn: data.slice(half)
    };
  }, [data]);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 왼쪽 열 */}
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">순위</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">키워드</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-400">검색량</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-400">변화</th>
            </tr>
          </thead>
          <tbody>
            {leftColumn.map((item) => (
              <tr 
                key={item.rank} 
                className={`border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer transition-colors ${
                  selectedKeyword === item.keyword ? 'bg-primary-500/10' : ''
                }`}
                onClick={() => onKeywordSelect(item.keyword)}
              >
                <td className="py-3 px-4 text-sm">{item.rank}</td>
                <td className="py-3 px-4 font-medium">{item.keyword}</td>
                <td className="py-3 px-4 text-right text-gray-300">{formatSearchCount(item.searchCount)}</td>
                <td className="py-3 px-4 text-right">{renderChangeIndicator(item.change, item.changeValue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 오른쪽 열 */}
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">순위</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">키워드</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-400">검색량</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-400">변화</th>
            </tr>
          </thead>
          <tbody>
            {rightColumn.map((item) => (
              <tr 
                key={item.rank} 
                className={`border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer transition-colors ${
                  selectedKeyword === item.keyword ? 'bg-primary-500/10' : ''
                }`}
                onClick={() => onKeywordSelect(item.keyword)}
              >
                <td className="py-3 px-4 text-sm">{item.rank}</td>
                <td className="py-3 px-4 font-medium">{item.keyword}</td>
                <td className="py-3 px-4 text-right text-gray-300">{formatSearchCount(item.searchCount)}</td>
                <td className="py-3 px-4 text-right">{renderChangeIndicator(item.change, item.changeValue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}