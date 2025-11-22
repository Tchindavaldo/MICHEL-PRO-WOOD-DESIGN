import { useState, useEffect } from 'react';
// @mui
import { Pagination, Tabs, Tab, Box } from '@mui/material';
// types
import { ICaseStudyProps } from 'src/types/case-study';
//
import MarketingCaseStudyItem from '../item';

// ----------------------------------------------------------------------

const ITEMS_PER_PAGE = 6;

type Props = {
  caseStudies: ICaseStudyProps[];
};

export default function MarketingCaseStudyList({ caseStudies }: Props) {
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState(1);

  const getCategories = caseStudies.map((project) => project.category);

  const categories = ['All', ...Array.from(new Set(getCategories))];

  const filtered = applyFilter(caseStudies, tab);

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setPage(1); // Reset to first page when changing category
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Tabs
        value={tab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
        slotProps={{
          startScrollButtonIcon: { sx: { width: 'max-content' } },
          endScrollButtonIcon: { sx: { width: 'max-content' } },
        }}
        sx={{
          mx: { xs: -2.5, md: 0 },
          px: { xs: 2.5, md: 0 },
          '& .MuiTabScrollButton-root': {
            width: 'max-content',
          },
        }}
      >
        {categories.map((category) => (
          <Tab key={category} value={category} label={category} />
        ))}
      </Tabs>

      <Box
        sx={{
          pt: 5,
          pb: 10,
          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {paginatedProjects.map((project) => (
          <MarketingCaseStudyItem key={project.id} project={project} />
        ))}
      </Box>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
          sx={{
            pb: 10,
            '& .MuiPagination-ul': {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(arr: ICaseStudyProps[], category: string) {
  if (category !== 'All') {
    arr = arr.filter((project) => project.category === category);
  }
  return arr;
}
