#ifndef __VECTOR_HPP__
#define __VECTOR_HPP__

class Rect2D;

/**
 * @class Vector2
 * @brief Simple two dimensional vector.
 */
class Vector2
{
public:
    Vector2(float nx, float ny)
        : x(nx), y(ny)
    {
    }
    Vector2(const Vector2 &other)
        : x(other.x), y(other.y)
    {
    }
    Vector2()
        : x(0), y(0)
    {
    }

    bool operator==(const Vector2 &other) const
    {
        return x == other.x && y == other.y;
    }

    bool operator!=(const Vector2 &other) const
    {
        return !(x == other.x && y == other.y);
    }

    const Vector2 &operator=(const Vector2 &other)
    {
        x = other.x;
        y = other.y;
        return *this;
    }

    Vector2 operator+(const Vector2 &other) const
    {
        return Vector2(x + other.x, y + other.y);
    }

    Vector2 operator-(const Vector2 &other) const
    {
        return Vector2(x - other.x, y - other.y);
    }

    Vector2 operator*(float s) const
    {
        return Vector2(x * s, y * s);
    }

    Vector2 operator/(float s) const
    {
        return Vector2(x / s, y / s);
    }

    Vector2 operator-() const
    {
        return Vector2(-x, -y);
    }

    const Vector2 &operator+=(const Vector2 &other)
    {
        x += other.x;
        y += other.y;
        return *this;
    }

    const Vector2 &operator-=(const Vector2 &other)
    {
        x -= other.x;
        y -= other.y;
        return *this;
    }

    const Vector2 &operator*=(float val)
    {
        x *= val;
        y *= val;
        return *this;
    }

    const Vector2 &operator/=(float val)
    {
        x /= val;
        y /= val;
        return *this;
    }

    /** Scalar product of 2 vectors */
    float operator*(const Vector2 &other) const
    {
        return x * other.x + y * other.y;
    }

    // ... add the other operators as needed, I'm too lazy now ...

    const Vector2 &constrain(const Rect2D &bounds);

    float x, y;
};

#endif
