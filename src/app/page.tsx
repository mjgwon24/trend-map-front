import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/common/Logo";

export default function Home() {
  return (
      <div className="min-h-screen bg-radial-gradient text-white">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Logo
                    showText={true}
                    size={"lg"}
                    fontWeight="bold"
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-primary-DEFAULT">트렌드</span>를 한눈에,<br />
                  <span className="text-secondary-DEFAULT">아이디어</span>는 빠르게
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-lg">
                  글로벌/국내 주요 플랫폼의 인기 검색어, 영상, 뉴스, 커뮤니티 이슈를
                  매일 업데이트되는 트렌드 랭킹으로 확인하세요.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                      href="/trend-ranking/daily"
                      className="px-6 py-3 bg-primary-DEFAULT hover:bg-primary-dark text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <span>트렌드 랭킹 보기</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <Link
                      href="/keyword-analysis"
                      className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 rounded-lg font-medium transition-colors"
                  >
                    키워드 분석하기
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-96 lg:h-[500px]">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/images/trend-dashboard-preview.svg"
                        alt="트렌드맵 대시보드 미리보기"
                        width={600}
                        height={400}
                        className="object-cover rounded-lg shadow-2xl"
                        priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-primary-DEFAULT">트렌드맵</span>으로 무엇을 할 수 있나요?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-700/50">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-DEFAULT">
                    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">일별 트렌드 랭킹</h3>
                <p className="text-gray-300">
                  주요 플랫폼의 인기 검색어, 영상, 뉴스를 매일 업데이트하여 한눈에 확인할 수 있습니다.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-700/50">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-DEFAULT">
                    <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">키워드 분석</h3>
                <p className="text-gray-300">
                  검색량, 경쟁도, 마진 등 키워드별 시장 데이터를 분석하여 아이디어를 빠르게 검증합니다.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-700/50">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-DEFAULT">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">맞춤형 대시보드</h3>
                <p className="text-gray-300">
                  관심 키워드와 플랫폼을 설정하여 나만의 트렌드 대시보드를 구성할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              다양한 플랫폼의 트렌드를 한곳에서
            </h2>
            <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
              글로벌/국내 주요 플랫폼의 데이터를 수집하여 가장 정확하고 신선한 트렌드 정보를 제공합니다.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {/* Platform logos */}
              {['YouTube', 'Reddit', 'Twitter', 'Google', 'Naver', 'Instagram'].map((platform) => (
                  <div key={platform} className="bg-black/40 backdrop-blur-sm p-4 rounded-lg shadow flex items-center justify-center hover:shadow-md transition-shadow border border-gray-700/50">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                        <Image
                            src={`/images/platforms/${platform.toLowerCase()}.svg`}
                            alt={`${platform} 로고`}
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-200">{platform}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Users Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              이런 분들에게 <span className="text-primary-DEFAULT">추천</span>합니다
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* User Type 1 */}
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-light/20 rounded-full flex items-center justify-center mr-2 text-primary-DEFAULT">1</span>
                  창업·마케팅·콘텐츠 기획자
                </h3>
                <p className="text-gray-300">
                  최신 트렌드를 파악하여 콘텐츠 기획과 마케팅 전략 수립에 활용할 수 있습니다.
                </p>
              </div>

              {/* User Type 2 */}
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-secondary-light/20 rounded-full flex items-center justify-center mr-2 text-secondary-DEFAULT">2</span>
                  트렌드에 민감한 일반인
                </h3>
                <p className="text-gray-300">
                  매일 업데이트되는 인기 키워드와 이슈를 쉽고 빠르게 파악할 수 있습니다.
                </p>
              </div>

              {/* User Type 3 */}
              <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-light/20 rounded-full flex items-center justify-center mr-2 text-primary-DEFAULT">3</span>
                  투자자·리서처
                </h3>
                <p className="text-gray-300">
                  시장 트렌드를 분석하여 투자 결정과 시장 조사에 필요한 인사이트를 얻을 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-primary-DEFAULT to-secondary-DEFAULT text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 바로 트렌드맵을 시작하세요
            </h2>
            <p className="text-lg mb-8 opacity-90">
              매일 업데이트되는 트렌드 랭킹으로 시장을 한발 앞서 파악하고 기회를 발견하세요.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                  href="/dashboard"
                  className="px-8 py-4 bg-white text-primary-DEFAULT rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                무료로 시작하기
              </Link>
              <Link
                  href="/developers"
                  className="px-8 py-4 bg-transparent border border-white hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
              >
                개발자 API 살펴보기
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-12 lg:px-24 bg-black/50 text-gray-400">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white text-lg font-bold mb-4">트렌드맵</h3>
                <p className="mb-4">글로벌/국내 주요 플랫폼의 트렌드를 한눈에 파악하세요.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">서비스</h4>
                <ul className="space-y-2">
                  <li><Link href="/trend-ranking/daily" className="hover:text-white transition-colors">일별 트렌드 랭킹</Link></li>
                  <li><Link href="/keyword-analysis" className="hover:text-white transition-colors">키워드 분석</Link></li>
                  <li><Link href="/dashboard" className="hover:text-white transition-colors">대시보드</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">개발자</h4>
                <ul className="space-y-2">
                  <li><Link href="/developers" className="hover:text-white transition-colors">API 문서</Link></li>
                  <li><Link href="/developers/pricing" className="hover:text-white transition-colors">요금제</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">회사</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-white transition-colors">소개</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">이용약관</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 트렌드맵. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}
