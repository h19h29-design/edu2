# RUNBOOK

## PowerShell 실행 방법

프로젝트 루트:

```powershell
cd D:\gpt\edu
```

패키지 설치:

```powershell
npm install
npm install motion lucide-react canvas-confetti clsx
```

개발 서버 실행:

```powershell
npm run dev
```

빌드:

```powershell
npm run build
```

빌드 결과 확인:

```powershell
Get-ChildItem .\dist
```

프리뷰 서버:

```powershell
npm run preview
```

## 주요 경로

- 발표 모드: `http://localhost:5173/slide`
- 학습 모드: `http://localhost:5173/study`
- 용어집: `http://localhost:5173/glossary`
- 프롬프트 실습: `http://localhost:5173/prompt`
- 실습 데모: `http://localhost:5173/demo`

## 배포용 dist 확인

`npm run build` 후 `dist/` 폴더를 정적 호스팅에 올릴 수 있다. Vercel, NAS 정적 웹 서버, 기관 내부 웹 서버에 배포할 수 있지만 실제 배포 전에는 기관 내부 규정과 계정 소유권을 확인한다.

## 보안 주의

이 강의 데모는 교육용이며 실제 학생, 학부모, 교직원 개인정보를 입력하지 않습니다. 외부 서비스 연결 전에는 기관 내부 규정, 계정 소유권, 보존기간, 요금, 장애 가능성을 반드시 확인해야 합니다.
