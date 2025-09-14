'use client';

interface KeywordDetailProps {
  keyword: string;
  relatedKeywords: string[];
  platform: string;
}

export default function KeywordDetail({
  keyword,
  relatedKeywords,
  platform
}: KeywordDetailProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <span className="text-primary-400 mr-2">#</span>
        <span>{keyword}</span>
        <span className="ml-2 text-sm text-gray-400">연관 키워드</span>
      </h3>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {relatedKeywords.map((relatedKeyword, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-300 cursor-pointer transition-colors"
          >
            {relatedKeyword}
          </span>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-400">
        <p>{platform} 기준 연관 검색어입니다.</p>
      </div>
    </div>
  );
}