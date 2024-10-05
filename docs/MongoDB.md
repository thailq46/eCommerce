# Nhược điểm của cách connect cũ

# Cách connect mới, khuyên dùng

# Kiểm tra hệ thống có bao nhiêu connect

# Thông báo khi server quá tải connect

# Có nên disConnnect() liên tục không?

Không cần đóng mongoDB liên tục theo cách thủ công vì mongoDB nó sử dụng 1 cái pool để quản lý csdl và nó sẽ sử lý mở và đóng kết nối khi cần. Tuy nhiên 1 số trường hợp muốn đóng kết nối 1 cách rõ ràng và tránh dữ liệu ko bị mất thì có thể sử dụng

# PoolSize là gì? Vì sao lại quan trọng?

PoolSize là tập hợp các kết nối của csdl mà có thể tái sử dụng đc duy trì bởi DB
=> Giúp cải thiện hiệu suất, khả năng mở rộng của ứng dụng thay bằng giảm chi phí,...
VD: Khi ứng dụng của bạn yêu cầu kết nối với CSDL thì nó sẽ kiểm tra nhóm kết nối trong poolSize có kết nối nào không => Nêú có nó sử dụng kết nối này cho 1 yêu cầu mới => Nếu không có thì sẽ tạo 1 kết nối mới và nó thêm vào trong nhóm

# Nếu vượt quá kết nối PoolSize?

Mongo nó sẽ không vượt qua kích thước của PoolSize thay vào đó nó sẽ cho xếp hàng và đợi các yêu cầu xử lý xong và có kết nối nào đó free thì nó cho phép chúng ta được sử dụng (VD maxPoolSize là 50 nhưng có đến 51 kết nối => thằng 51 sẽ đợi và trong 50 thằng request trước đó thằng nào xong thì 51 sẽ nhảy vào)
