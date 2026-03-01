import { Header } from '../components/Header/Header';
import { Content } from '../components/Content/Content';
import { useVideos } from '../hooks/useVideos';
import { useVideoFilters } from '../hooks/useVideoFilters/useVideoFilters';

import { PageContainer, HeaderWrapper } from './styles';


export const HomePage = () => {
  const { data, isLoading, isError } = useVideos();
  const { videos = [], genres = [] } = data ?? {};

  const {
    search,
    selectedYear,
    selectedGenres,
    availableYears,
    availableGenres,
    filteredVideos,
    setSearch,
    setSelectedYear,
    setSelectedGenres,
  } = useVideoFilters({ videos, genres });

  return (
    <PageContainer>
      <HeaderWrapper>
        <Header
          genres={availableGenres}
          years={availableYears}
          search={search}
          selectedYear={selectedYear}
          selectedGenres={selectedGenres}
          onSearchChange={setSearch}
          onYearChange={setSelectedYear}
          onGenresChange={setSelectedGenres}
          disabled={isLoading}
        />
      </HeaderWrapper>
      <Content videos={filteredVideos} isLoading={isLoading} isError={isError} />
    </PageContainer>
  );
};
