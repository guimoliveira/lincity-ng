#ifndef _pbar_h
#define _pbar_h

void init_pbars(void);
void refresh_pbars(void);

void update_pbar(int pbar_num, int value, int month_flag);
void update_pbars_monthly(void);

#define NUM_PBARS 15
#define OLD_NUM_PBARS 9

/* Position constants aka linenumbers for pbars struct */

#define PPOP 0
#define PTECH 1
#define PMONEY 2
#define PFOOD 3
#define PLABOR 4
#define PGOODS 5
#define PCOAL 6
#define PORE 7
#define PSTEEL 8

#define PBAR_PAGE_SHIFT 6

#define PPOL 9
#define PLOVOLT 10
#define PHIVOLT 11
#define PWATER 12
#define PWASTE 13
#define PHOUSE 14

/* Number of elements per pbar */
#define PBAR_DATA_SIZE 1

struct pbar_st
{
    int oldtot; // unused
    int tot;    // unused
    int diff;

    int data_size; // unused
    int data[PBAR_DATA_SIZE];
};

extern struct pbar_st pbars[NUM_PBARS];

#endif