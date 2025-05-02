import { useMutation, useQueryClient } from '@tanstack/react-query'

import deleteUpload from '../../../services/upload/delete-upload'

export default function useDeleteUpload() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUpload,
        onSuccess: () => {
            queryClient.invalidateQueries(['uploads']);
        },
    });
};