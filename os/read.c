#include <unistd.h>
#include <fcntl.h>

#define BUF_SIZE 128

int main (int argc, char* argv[]) {
    if (argc != 2) {
        return -1;
    }

    int fd = open(argv[1], O_RDONLY);

    if (fd == -1) {
        return -1;
    }

    char buf[BUF_SIZE];
    ssize_t bytes_read;
    
    while ((bytes_read = read(fd, buf, BUF_SIZE)) > 0) {
        write(STDOUT_FILENO, buf, bytes_read);
    }
}
