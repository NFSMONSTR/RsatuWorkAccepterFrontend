const permission_convert = (role) => {
    switch (role) {
        case null | undefined: return 0;
        case 'USER': return 0;
        case 'TEACHER': return 5;
        case 'ADMIN': return 10;
    }
}

export default permission_convert;