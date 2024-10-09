#ifndef __LC_ERROR_H__
#define __LC_ERROR_H__

#include <errno.h>

#define error(STATUS, ERRNO, FORMAT...) \
    error_at_line(STATUS, ERRNO, NULL, 0, FORMAT)
void error_at_line(int status, int errnum, const char *fname,
                   unsigned int lineno, const char *format, ...);

#endif // __LC_ERROR_H__
